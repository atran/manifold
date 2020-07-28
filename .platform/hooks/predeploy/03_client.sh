#!/bin/bash

echo "==> Installing Client node dependencies…"
cd client &>/dev/null
if [ -f "package.json" ]; then
  yarn install --check-files --force --production
fi

echo "==> Creating Client config files…"
touch dist/manifold/ssr/ssr.config.js
echo "process.env.DOMAIN = '${DOMAIN}';" >> dist/manifold/ssr/ssr.config.js
echo "process.env.NODE_ENV = '${NODE_ENV}';" >> dist/manifold/ssr/ssr.config.js
echo "process.env.CLIENT_SERVER_SOCKET = '/var/app/current/client/${CLIENT_SERVER_SOCKET}';" >> dist/manifold/ssr/ssr.config.js
echo "process.env.API_URL = 'http://localhost';" >> dist/manifold/ssr/ssr.config.js

touch dist/manifold/www/browser.config.js
echo "if (!window.process) window.process = {};" >> dist/manifold/www/browser.config.js
echo "if (!window.process.env) window.process.env = {};" >> dist/manifold/www/browser.config.js
echo "process.env.DOMAIN = '${DOMAIN}';" >> dist/manifold/www/browser.config.js
echo "process.env.NODE_ENV = '${NODE_ENV}';" >> dist/manifold/www/browser.config.js
echo "process.env.SSL_ENABLED = false;" >> dist/manifold/www/browser.config.js

cd .. &>/dev/null
