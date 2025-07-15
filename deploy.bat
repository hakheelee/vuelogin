@echo off

echo Building the project...
call npm run build

echo Changing to dist directory...
cd dist

echo Initializing git repository...
git init
git add -A
git commit -m "deploy"

echo Pushing to GitHub Pages...
git push -f https://github.com/hakheelee/vuelogin.git master:gh-pages

echo Returning to project root...
cd ..
