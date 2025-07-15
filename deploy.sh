#!/usr/bin/env sh

# 스크립트 실행 중 에러가 발생하면 중단
set -e

# 빌드
npm run build

# 빌드 결과물 디렉토리로 이동
cd dist

# 만약 커스텀 도메인을 사용한다면
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# GitHub Pages에 배포
# https://<USERNAME>.github.io/<REPO>에 배포하는 경우
git push -f git@github.com:hakheelee/vuelogin.git master:gh-pages

cd -
