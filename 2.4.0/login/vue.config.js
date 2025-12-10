// vue.config.js
const fs = require('fs')
let buildVersion = require('./build-version')
// TODO: 版本管理
if (process.env.NODE_ENV === 'production') {
  buildVersion = buildVersion + 1
  fs.writeFile('./build-version.js', 'module.exports = ' + buildVersion + '\n', function (err) {
    if (err) {
      console.error(err)
    } else {
      console.log('更新版本')
    }
  })
}
const pkg = require('./package.json')
const productVersion = pkg.version
process.env.VUE_APP_VERSION = process.env.VUE_APP_VERSION === undefined ? 'dev' + '_' + productVersion + '-' + buildVersion : process.env.VUE_APP_VERSION + '_' + productVersion + '-' + buildVersion // 版本号
module.exports = {
  // 文件访问时相对路径
  baseUrl: '',

  // build 输出文件夹名字
  outputDir: 'dist/' + process.env.VUE_APP_VERSION,

  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html'
    }
  },

  // i18n 单个文件组件配置
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
