'use strict'
const merge = require('webpack-merge')
const devEnv = require('./jml.dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  ENV: '"test"', // 测试环境
  API_URL: '"https://testing-api.jinmuhealth.com:37534/l-v2-api"' // 一体机 (JinmuL) APP H5 的 API 端点
})
