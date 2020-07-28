#!/bin/bash

echo "==> Aliasing DB variables…"

export RAILS_DB_USER=$RDS_USERNAME
export RAILS_DB_PASS=$RDS_PASSWORD
export RAILS_DB_HOST=$RDS_HOSTNAME
export RAILS_DB_PORT=$RDS_PORT
export RAILS_DB_NAME=$RDS_DB_NAME
