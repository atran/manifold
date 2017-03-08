require "rails_helper"

RSpec.describe Resource, type: :model do

  it "has a valid factory" do
    expect(FactoryGirl.build(:resource)).to be_valid
  end

  it "belongs to a project" do
    resource = FactoryGirl.create(:resource)
    expect(resource.project).to be_a Project
  end

  it "is invalid without a title" do
    resource = FactoryGirl.build(:resource, title: "")
    expect(resource).to_not be_valid
  end

  it "has a list of tags" do
    resource = FactoryGirl.create(:resource)
    resource.keywords = "one, two; three"
    resource.save
    expect(resource.tag_list.count).to eq(3)
  end

  describe "formats some fields with a markdown subset" do
    let(:raw) { "_italic_ a **bold**"}
    let(:formatted) { "<em>italic</em> a <strong>bold</strong>"}

    it "has a formatted title after save" do
      resource = FactoryGirl.create(:resource, title: raw)
      expect(resource.title_formatted).to eq (formatted)
    end

    it "has a formatted caption after save" do
      resource = FactoryGirl.create(:resource, caption: raw)
      expect(resource.caption_formatted).to eq (formatted)
    end

    it "has a formatted description after save" do
      resource = FactoryGirl.create(:resource, description: raw)
      expect(resource.description_formatted).to eq (formatted)
    end
  end

  it { is_expected.to have_attached_file(:attachment) }

  context "can be filtered" do

    before(:each) do
      @project_a = FactoryGirl.create(:project, title: "project_a")
      @project_b = FactoryGirl.create(:project, title: "project_b")
      @resource_a = FactoryGirl.create(:resource, title: "resource_a", project: @project_a)
      @resource_b = FactoryGirl.create(:resource, title: "resource_b", project: @project_a)
      @resource_c = FactoryGirl.create(:resource, title: "resource_c", project: @project_b, keywords: "test")
    end

    it "and ordered by collection order" do
      collection = FactoryGirl.create(:collection, project: @project_a);
      collection.resources << @resource_a
      collection.resources << @resource_b
      collection.save
      results = Resource.filter({collection_order: collection.id})
      expect(results.first.id).to eq @resource_a.id
    end

    it "to only include those belonging to a project" do
      results = Resource.filter({project: @project_a})
      expect(results.length).to be 2
      results = Resource.filter({project: @project_b})
      expect(results.length).to be 1
    end

    it "by kind" do
      # TBD: Expand this test. Right now all factory resources are videos to avoid dealing
      # with attachments.
      results = Resource.filter({kind: "video"})
      expect(results.length).to be 3
    end

    it "by tag" do
      results = Resource.filter({tag: "dog"})
      expect(results.length).to be 2
      results = Resource.filter({tag: "test"})
      expect(results.length).to be 1
    end
  end
end
