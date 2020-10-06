module Api
  module Proxy
    class IngestionSourcesController < ActionController::API

      def show
        source = IngestionSource.find(params[:id])
        raise ActionController::RoutingError unless source.attachment

        path = open(source.attachment.storage.url(source.attachment.id))
        send_file(
          path,
          type: source.attachment.mime_type,
          disposition: "inline"
        )
      end

    end
  end
end
