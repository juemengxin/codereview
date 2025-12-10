'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  DIST: '"jml"', // 一体机客户端
  ENV: '"prod"', // 正式环境
  API_URL: '"https://api.jinmuhealth.com:59434/l-v2-api"' // 一体机 (JinmuL) APP H5 的 API 端点
})
