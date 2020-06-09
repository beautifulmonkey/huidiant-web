rm -rf dist
cp src/config/env_production.js src/config/env.js
npm run build
scp -r /Users/smartbow/vue/kitty-ui/dist root@47.111.20.15:/root/works/skyunx-web
