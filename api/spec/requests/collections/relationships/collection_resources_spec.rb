require "rails_helper"

RSpec.describe "Collection Resources API", type: :request do

  before(:each) do
    @collection = FactoryGirl.create(:collection)
    @resource = FactoryGirl.create(:resource, project: @collection.project)
    @collection_resource = FactoryGirl.create(:collection_resource, resource: @resource, collection: @collection)
  end

  describe "sends a list of collection_resources" do
    describe "the response" do
      it "has a 200 status code" do
        get api_v1_collection_relationships_collection_resources_path(@collection)
        expect(response).to have_http_status(200)
      end
    end
  end

  describe "sends a collection_resource" do
    describe "the response" do
      it "has a 200 status code" do
        get api_v1_collection_relationships_collection_resource_path(@collection, @collection_resource)
        expect(response).to have_http_status(200)
      end
    end
  end

end
