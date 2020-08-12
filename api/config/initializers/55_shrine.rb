require "dotenv"

require "shrine/storage/file_system"
require "shrine/storage/memory"
require "shrine/storage/tus"
require "shrine/storage/s3"

Shrine.storages = {
  cache: Shrine::Storage::FileSystem.new("public", prefix: "system/cache"),
  store: Shrine::Storage::S3.new(
    bucket: ENV["AWS_S3_BUCKET"],
    region: ENV["AWS_S3_REGION"],
    access_key_id: ENV["AWS_ACCESS_KEY_ID"],
    secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"]
  )
}

Shrine.storages[:tus] =
  if Rails.env.test?
    Shrine::Storage::Memory.new
  else
    Shrine::Storage::FileSystem.new("data")
  end

Shrine.plugin :activerecord
Shrine.plugin :parsed_json
Shrine.plugin :refresh_metadata
Shrine.plugin :signature
