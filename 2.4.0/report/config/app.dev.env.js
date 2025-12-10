'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./app.prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV: '"dev"', // 开发环境
  API_URL: '"https://dev-api.jinmuhealth.com:37633/v2-api"', // 金姆健康 APP H5 的 API 端点
  HEALTH_API_VERSION: '"2-3"'
})
