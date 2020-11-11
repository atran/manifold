#!/bin/bash
echo "Copying oauth.yml from S3..."

aws s3 cp s3://fulltext-dev/config/oauth.yml ./api/config/oauth.yml