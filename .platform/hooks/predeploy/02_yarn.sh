#!/bin/bash

YARN_REPO="/etc/yum.repos.d/yarn.repo"

# If yarn is not detected, install it.
if which yarn; then
  echo "Skipping installation of yarn -- yarn already installed."
  echo "yarn --version: `yarn --version`"
else
  echo "which yarn: `which yarn`"
  echo "Yarn is not installed and accessible."
  echo "Installing yarn..."

  if [ ! -f $YARN_REPO ]; then
    sudo wget https://dl.yarnpkg.com/rpm/yarn.repo -O $YARN_REPO
  
    # Confirm that it downloaded
    file /etc/yum.repos.d/yarn.repo
  fi
  
  # If node is not detected, install it.
  if [ ! -f /usr/bin/node ]; then
    echo "Skipping installation of node -- node already installed."
    echo "node --version: `node --version`"
  else
    echo "Installing Node"
    yum install -y nodejs --enablerepo=epel
  fi

  # install yarn
  sudo yum install -y yarn
  yarn --version

  echo "... and finished installing yarn."
fi
