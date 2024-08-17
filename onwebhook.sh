set -ex

cd amano/amanosblog
pwd
ls

git pull

npx hexo generate

echo done
