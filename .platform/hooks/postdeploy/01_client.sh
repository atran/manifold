#!/bin/bash
echo "Running post deploy scripts:"

# We have to do this since the app
# directory changes...
echo "Reinstalling Client node dependencies..."
cd client &>/dev/null
if [ -f "package.json" ]; then
  yarn install --check-files --force --production
fi

cd .. &>/dev/null

echo "Restarting client service..."
systemctl restart client
