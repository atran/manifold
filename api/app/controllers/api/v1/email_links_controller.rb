module Api
  module V1
    class EmailLinksController < ApplicationController
      def index
        @email_link = EmailLink.generate(params[:email])
        render json: @email_link
      end

      def show
      end

      def create
        @email_link = EmailLink.generate(params[:email])

        if @email_link
          redirect_to root_path
        else
          redirect_to new_magic_link_path
        end
      end

      def validate
        email_link = EmailLink.where(token: params[:token]).where("expires_at > ?", DateTime.now).first

        unless email_link
          flash[:alert] = "Invalid or expired token!"
          redirect_to new_magic_link_path
        end

        sign_in(email_link.user, scope: :user)
        redirect_to root_path
      end
    end
  end
end