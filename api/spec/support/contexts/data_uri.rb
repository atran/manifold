RSpec.shared_context "data uri" do
  let(:manifold_logo_data_uri) { %[data:image/png;base64,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] }
end

RSpec.configure do |config|
  config.include_context "data uri", data_uri: true
end
