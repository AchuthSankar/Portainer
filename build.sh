#!/usr/bin/env bash

VERSION=$1
PASSWORD=$2
if [[ $# -ne 2 ]] ; then
  echo "Usage: $(basename $0) <VERSION> <PASSWORD>"
  exit 1
fi

mkdir -pv /tmp/portainer-builds

grunt release
echo -n $PASSWORD > dist/password
docker build -t secured/portainer:linux-amd64-${VERSION} -f build/linux/Dockerfile .
docker build -t secured/portainer:linux-amd64 -f build/linux/Dockerfile .
rm -rf /tmp/portainer-builds/unix && mkdir -pv /tmp/portainer-builds/unix/portainer
mv dist/* /tmp/portainer-builds/unix/portainer
cd /tmp/portainer-builds/unix
tar cvpfz portainer-${VERSION}-linux-amd64.tar.gz portainer
mv portainer-${VERSION}-linux-amd64.tar.gz /tmp/portainer-builds/
cd -

exit 0
