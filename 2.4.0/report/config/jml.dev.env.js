'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./jml.prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV: '"dev"', // 开发环境
  API_URL: '"https://dev-api.jinmuhealth.com:37634/l-v2-api"' // 一体机 (JinmuL) APP H5 的 API 端点
})
