'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  DIST: '"app"', // 金姆健康app客户端
  ENV: '"production"', // 正式环境
  API_URL: '"https://api.jinmuhealth.com:59433/v2-api"' // 金姆健康 APP H5 的 API 端点
})
