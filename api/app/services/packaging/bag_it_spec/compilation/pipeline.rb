module Packaging
  module BagItSpec
    module Compilation
      # This pipeline will compile a {Project} into a BagIt spec archive.
      class Pipeline
        include Packaging::BagItSpec::PipelinedTransaction

        step :prepare!, with: "compilation.prepare"

        batch_map_state :prepare_text!, with: "compilation.prepare_text",
          source: ->(state) { state[:context].published_texts },
          target: :texts

        batch_map_state :prepare_resources!, with: "compilation.prepare_resource",
          source: ->(state) { state[:context].resources },
          target: :resources

        pipe :add_texts!, with: "compilation.add_texts"

        pipe :add_resources!, with: "compilation.add_resources"

        pipe :write_metadata!, with: "compilation.write_metadata"

        pipe :build_manifest!, with: "compilation.build_manifest"

        pipe_into :build_archive!, with: "compilation.build_archive",
          target: :archive

        pipe :finalize!, with: "compilation.finalize"
      end
    end
  end
end
