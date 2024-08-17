#1/usr/bin/env node

set -ex

cd amano/amanosblog
pwd
ls

git pull

node_modules/.bin/hexo generate

echo done
