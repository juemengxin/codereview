'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV: '"dev"', // 开发环境
  API_URL: '"https://dev-api.jinmuhealth.com"' // 微信 H5 的 API 与 Web 前端宿主服务的端点
})
