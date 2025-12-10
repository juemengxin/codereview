'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  ENV: '"test"', // 测试环境
  API_URL: '"https://testing-api.jinmuhealth.com"' // 微信 H5 的 API 与 Web 前端宿主服务的端点
})
