FactoryBot.define do
  factory :email_link do
    token { "MyString" }
    expires_at { "2020-10-14 12:48:54" }
    user { nil }
  end
end
