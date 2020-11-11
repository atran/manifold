require "pathname"

namespace :manifold do
  namespace :import do
    desc "Imports all projects in a directory into Manifold"
    task :projects, [:path, :include_texts, :log_level] => :environment do |_t, args|
      include_texts = args[:include_texts] != "no"
      children = Pathname.new(args[:path]).children.select(&:directory?)
      logger = Manifold::Rake.logger
      user = Manifold::Rake.cli_user
      children.each do |child|
        next if File.file?(File.join(child, ".skip"))

        Importer::Project.new(child, user, logger).import(include_texts: include_texts)
      end
    end

    desc "Imports all texts in a directory into Manifold and creates a project for each text"
    task :texts, [:path] => :environment do |_t, args|
      children = Pathname.new(args[:path]).children.select { |p| p.extname.downcase == ".epub" }
      logger = Manifold::Rake.logger
      user = Manifold::Rake.cli_user
      children.each do |text_path|
        ApplicationRecord.transaction do
          project = Project.create(title: "text-import-project-placeholder", creator: user, draft: false)
          logger.info("Created project #{project.id}")
          ingestion = Ingestions::CreateManually.run(project: project,
                                                     source: File.open(text_path),
                                                     creator: user).result
          logger.info "  Importing project text at #{text_path}"
          outcome = Ingestions::Ingestor.run ingestion: ingestion,
                                             logger: logger
          text = outcome.result if outcome.valid?
          if text.present?
            logger.info "Created #{'published ' if text.published?}text #{text.title}"
            logger.info("Updating project title and slug")
            project.title = text.title
            project.pending_slug = text.title
            project.save
            logger.info "  Creating project content blocks"
            Content::ScaffoldProjectContent.run project: project,
                                                kind: "one_text"
            ContentBlockReference.create(
              content_block: project.content_blocks.first,
              referencable: project.texts.first, kind: "text"
            )
          else
            logger.error "Unable to import project text at #{text_path}"
          end
        end
      end
    end

    desc "Imports text/project metadata from Verso's API"
    task :verso_metadata => :environment do |_t, args|
      logger = Manifold::Rake.logger
      Project.all.each do |text_project|
        ApplicationRecord.transaction do
          this_text = text_project.texts.first
          isbn = this_text.metadata['unique_identifier'].tr('^0-9', '')
          api_url = "https://versobooks.com/api/v1/editions.json?isbn=#{isbn}"
          begin
            logger.info "Reading #{api_url}..."

            # Note that this redirects to the "dominant"
            # aka physical book reference rather than 
            # the ePub reference.
            verso_metadata = JSON.parse(open(api_url).read)

            # Text metadata
            text_project.pending_slug = verso_metadata['slug']
            text_project.description = verso_metadata['description']
            text_project.subtitle = verso_metadata['teaser']

            # Image metadata
            image_url = verso_metadata['flat_image_urls']['original']
            filename = File.basename(URI.parse(image_url).path)
            ext = File.extname(filename)
            name = File.basename(filename, ext)
            tmp = Tempfile.new([name, ext])
            File.open(tmp, "wb") { |fo| fo.write(open(image_url).read) }
            text_project.avatar = open(tmp)
            text_project.hero = open(tmp)
            this_text.cover = open(tmp)

            # Link metadata
            text_project.action_callouts.destroy_all
            text_project.action_callouts.create(
              title: 'Verso Catalog',
              url: verso_metadata['url']
            )

            text_project.save
            this_text.save
          end
        rescue
          text_project.avatar = nil
          text_project.hero = nil
          this_text.cover = nil

          text_project.save
          this_text.save
          next
        end
      end
    end
  end
end
