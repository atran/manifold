require "forwardable"

module Importer
  module Helpers
    # Logger helper for Drive Resources importer
    class Logger

      extend Forwardable
      def_delegators :@logger, :info, :warn, :debug, :error

      def initialize(logger)
        @logger = logger
      end

      def log_model_errors(model)
        log_validation_errors(model)
        log_attachment_errors(model)
        nil
      end

      def log_validation_errors(model)
        model.errors.full_messages.each do |error|
          # rubocop:disable LineLength
          @logger.error Rainbow("    #{model.class.name} model validation error: #{error}").red
          # rubocop:enable LineLength
        end
      end

      def log_attachment_errors(model)
        return unless model.class.name == "Resource"
        # rubocop:disable LineLength
        @logger.error Rainbow("        Attachment content type: #{model.attachment.content_type}").red
        # rubocop:enable LineLength
      end

      def log_missing_file(filename)
        @logger.error(Rainbow("    Unable to locate drive file: #{filename}").red)
        nil
      end

      def log_found_file(file)
        @logger.info "    Found drive file."
        @logger.info "        Name: #{file.title}"
        @logger.info "        Type: #{file.mime_type}"
        @logger.info "        Checksum: #{file.md5_checksum}"
        @logger.info "        Remote Size: #{file.size}"
        nil
      end

      def log_unchanged_file(file)
        # rubocop:disable LineLength
        @logger.info "        File \"#{file.title}\" Checksum is unchanged. Skipping download."
        # rubocop:enable LineLength
        nil
      end

      def log_start_download(_file)
        @logger.info("        Starting download from drive.")
        nil
      end

      def log_download(_file, io)
        @logger.info("        Downloaded file.")
        @logger.info("            Local Size: #{io.size}")
        nil
      end

      def log_fingerprint(fingerprint)
        @logger.info "    Generated fingerprint: #{fingerprint}"
        nil
      end

      def log_already_in_collection
        @logger.info "        Resource alreeady belongs to collection. Skipping."
        nil
      end

      def log_missing_collection
        @logger.error Rainbow("        Unable to locate collection.").red
        @logger.error Rainbow("        Unable to add resource collection.").red
        nil
      end

    end
  end
end
