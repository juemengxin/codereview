'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./jml.prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"staging"',
  ENV: '"staging"', // 预发布环境
  API_URL: '"https://staging-api.jinmuhealth.com:37434/l-v2-api"' // 一体机 (JinmuL) APP H5 的 API 端点
})
