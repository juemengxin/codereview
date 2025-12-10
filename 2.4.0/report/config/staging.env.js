'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"staging"',
  ENV: '"staging"', // 预发布环境
  API_URL: '"https://staging-api.jinmuhealth.com"' // 微信 H5 的 API 与 Web 前端宿主服务的端点
})
