'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./app.prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"staging"',
  ENV: '"staging"', // 预发布环境
  API_URL: '"https://staging-api.jinmuhealth.com:37633/v2-api"' // 金姆健康 APP H5 的 API 端点
})
