#!/bin/bash

echo "==> Installing API gem dependencies…"
cd api &>/dev/null
if [ -f "Gemfile" ]; then
  /opt/rubies/ruby-2.6.6/bin/bundle install
fi
cd .. &>/dev/null
