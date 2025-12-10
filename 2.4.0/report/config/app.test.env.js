'use strict'
const merge = require('webpack-merge')
const devEnv = require('./app.dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  ENV: '"testing"', // 测试环境
  // TODO
  API_URL: '"https://testing-api.jinmuhealth.com:37633/v2-api"' // 金姆健康 APP H5 的 API 端点
  // API_URL: '"http://10.121.214.140:9100/v2-api"' // 金姆健康 APP H5 的 API 端点
})
