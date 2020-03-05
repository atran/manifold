module Api
  module V1
    class EntitlementsController < ApplicationController
      resourceful! Entitlement do
        Entitlement.all
      end

      def index
        @entitlements = load_entitlements

        render_multiple_resources @entitlements
      end

      def show
        @entitlement = load_and_authorize_entitlement

        render_single_resource @entitlement
      end

      def create
        inputs = entitlement_params.require(:data).require(:attributes).to_h

        inputs[:entitling_entity] = current_user

        outcome = Entitlements::Create.run inputs

        if outcome.valid?
          render_single_resource outcome.result
        else
          respond_with_errors outcome
        end
      end

      def destroy
        @entitlement = load_and_authorize_entitlement

        if @entitlement.destroy
          head :no_content
        else
          # :nocov:
          render_single_resource @entitlement
          # :nocov:
        end
      end
    end
  end
end
