import axios from 'axios' // http请求插件
const contentType = 'application/json'
// client 类 api
class ApiClient {
  /**
   *
   *  金姆健康app客户端授权
   *
   *  @param {string} clientId 客户端ID
   *  @param {string} secretKeyHash 经过 SHA256 签名的 App 授权密钥
   *  @param {string} seed 随机种子。四个可读ASCII字符，例如：a#B9
   */
  clientAuth(clientId, secretKeyHash, seed) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        'X-Locale': Intl.DateTimeFormat().resolvedOptions().locale,
        'X-TimeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      url: '/client/auth',
      data: JSON.stringify({
        client_id: clientId,
        secret_key_hash: secretKeyHash,
        seed: seed
      })
    })
  }
}

// owner 类 api
class ApiOwner {
  /**
   *
   *  @param {string} authorization Client验证授权信息
   *  @param {string} xAccessToken 用户登录 token
   */
  constructor(authorization, xAccessToken) {
    this.authorization = authorization
    this.xAccessToken = xAccessToken
  }
  /**
   *
   *  金姆健康app查看测量历史记录
   *
   *  @param {string <date-time>} start 筛选起始时间，UTC时区， 2018-07-04T08:01:27Z 格式
   *  @param {string <date-time>} end 筛选结束时间，UTC时区， 2018-07-04T08:01:27Z 格式
   *  @param {integer} offset 分页偏移量
   *  @param {integer} size 每页最大显示数量
   *  @param {integer} userId 用户ID
   */
  getRecordHistory(start, end, offset, size, userId) {
    return axios({
      method: 'get',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken,
        'X-Locale': Intl.DateTimeFormat().resolvedOptions().locale,
        'X-TimeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      url: '/owner/measurements',
      params: {
        start,
        end,
        offset,
        size,
        user_id: userId
      }
    })
  }
  /**
   *
   *  金姆健康app提交智能分析
   *
   *  @param {integer} recordId 测量流水号
   *  @param {integer} cid 测量流水号
   *  @param {string} analysisSession 智能分析会话信息（如果有问询需要在后续请求中填写该字段）
   *  @param {Array.Object} answers
   *  @param {string} answers.question_key 问题唯一标识
   *  @param {string} answers.values 答案
   *  @param {integer} userId 用户ID
   */
  submitRecordAnalyze(recordId, cid, analysisSession, answers, userId) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken,
        'X-Locale': Intl.DateTimeFormat().resolvedOptions().locale,
        'X-TimeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      url: '/owner/measurements/' + recordId + '/analyze',
      data: JSON.stringify({
        cid: cid,
        analysis_session: analysisSession,
        answers: answers,
        user_id: userId
      })
    })
  }
  /**
   * 金姆健康app提交智能分析
   * @param {*} recordId 测量流水号
   * @param {*} language 语言
   * @param {*} questionAnswers 问题列表
   * @param {*} physicalDialectics 体质
   * @param {*} disease 疾病
   * @param {*} dirtyDialectic 脏腑
   */
  submitRecordV2Analyze(recordId, language, questionAnswers) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken,
        'X-Locale': Intl.DateTimeFormat().resolvedOptions().locale,
        'X-TimeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      url: '/owner/measurements/' + recordId + '/v2/analyze',
      data: JSON.stringify({
        transaction_id: recordId,
        language: language,
        question_answers: questionAnswers
      })
    })
  }
  /**
   * 获取周报
   * @param {*} language 语言
   * @param {*} userId
   */
  getWeeklyReport(language, userId) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken,
        'X-Locale': Intl.DateTimeFormat().resolvedOptions().locale,
        'X-TimeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      url: 'owner/' + userId + '/measurements/v2/weekly_report',
      data: JSON.stringify({
        language: language
      })
    })
  }
  /**
   * 获取月报
   * @param {*} language 语言
   * @param {*} userId
   */
  getMonthlyReport(language, userId) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken,
        'X-Locale': Intl.DateTimeFormat().resolvedOptions().locale,
        'X-TimeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      url: 'owner/' + userId + '/measurements/v2/monthly_report',
      data: JSON.stringify({
        language: language
      })
    })
  }
  /**
   *
   * 金姆健康app获取分析报告页面
   *
   *  @param {integer} recordId 测量流水号
   */
  getRecordAnalyze(recordId) {
    return axios({
      method: 'get',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken,
        'X-Locale': Intl.DateTimeFormat().resolvedOptions().locale,
        'X-TimeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      url: '/owner/measurements/' + recordId + '/analyze'
    })
  }
  /**
   *
   * 金姆健康app获取分析报告页面
   *
   *  @param {integer} recordId 测量流水号
   */
  getRecordV2Analyze(recordId) {
    return axios({
      method: 'get',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken,
        'X-Locale': Intl.DateTimeFormat().resolvedOptions().locale,
        'X-TimeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      url: '/owner/measurements/' + recordId + '/v2/analyze'
    })
  }
  /**
   *
   * 金姆健康app获取分享分析报告页面
   *
   *  @param {string} token 分享的token
   */
  getShareRecordAnalyze(token) {
    return axios({
      method: 'get',
      headers: {
        'Content-Type': contentType,
        'X-Locale': Intl.DateTimeFormat().resolvedOptions().locale,
        'X-TimeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      url: '/owner/measurements/token/' + token + '/analyze'
    })
  }
  /**
   *
   * 金姆健康app获取分享分析报告页面
   *
   *  @param {string} token 分享的token
   */
  getShareRecordV2Analyze(token) {
    return axios({
      method: 'get',
      headers: {
        'Content-Type': contentType,
        'X-Locale': Intl.DateTimeFormat().resolvedOptions().locale,
        'X-TimeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      url: '/owner/measurements/token/' + token + '/v2/analyze'
    })
  }
  /**
   *
   * 金姆健康app获取周的测量记录
   *
   */
  getWeekMeasurements(userId) {
    return axios({
      method: 'get',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken,
        'X-Locale': Intl.DateTimeFormat().resolvedOptions().locale,
        'X-TimeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      url: '/owner/' + userId + '/week_measurements'
    })
  }
  /**
   *
   * 金姆健康app获取月的测量记录
   *
   */
  getMonthMeasurements(userId) {
    return axios({
      method: 'get',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken,
        'X-Locale': Intl.DateTimeFormat().resolvedOptions().locale,
        'X-TimeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      url: '/owner/' + userId + '/month_measurements'
    })
  }
  /**
   *
   *  金姆健康app修改测量备注
   *
   *  @param {integer} recordId 测量流水号
   *  @param {integer} userId 用户ID
   *  @param {string} remark 备注
   */
  updateRemark(recordId, userId, remark) {
    return axios({
      method: 'put',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken,
        'X-Locale': Intl.DateTimeFormat().resolvedOptions().locale,
        'X-TimeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      url: '/owner/measurements/' + recordId + '/remark',
      data: JSON.stringify({
        user_id: userId,
        remark: remark
      })
    })
  }
  /**
   *
   *  金姆健康app客户端获取词条url前缀
   *
   */
  getUrl(clientId, secretKeyHash, seed, version, environment) {
    let url =
      environment === 'production'
        ? 'https://status.jinmuhealth.com/_sys/client_preferences'
        : 'https://staging-api.jinmuhealth.com/_sys/client_preferences'
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        'X-Locale': Intl.DateTimeFormat().resolvedOptions().locale,
        'X-TimeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      url: url,
      data: JSON.stringify({
        client_id: 'jm-10005',
        secret_key_hash: secretKeyHash,
        seed: seed,
        client_version: version,
        environment: environment
      })
    })
  }
}

// users 类 api
class ApiUsers {
  /**
   *
   *  @param {string} authorization Client验证授权信息
   */
  constructor(authorization) {
    this.authorization = authorization
  }
  /**
   *
   *  金姆健康app登录
   *
   *  @param {string} signInKey 用户名/邮箱/电话号码
   *  @param {string} registertype 注册类型，支持以下字符串值
   *  @param {string} passwordHash 密码 SHA256 encoded
   */
  signIn(signInKey, registertype, passwordHash) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Locale': Intl.DateTimeFormat().resolvedOptions().locale,
        'X-TimeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      url: '/users/signin',
      data: JSON.stringify({
        sign_in_key: signInKey,
        register_type: registertype,
        password_hash: passwordHash
      })
    })
  }
}

// 一体机 类 api
class ApiJML {
  /**
   *
   *  @param {string} authorization Client验证授权信息
   *  @param {string} xAccessToken 用户登录 token
   */
  constructor(authorization, xAccessToken) {
    this.authorization = authorization
    this.xAccessToken = xAccessToken
  }
  /**
   *
   *  一体机客户端授权
   *
   *  @param {string} clientId 客户端ID
   *  @param {string} secretKeyHash 经过 SHA256 签名的 App 授权密钥
   *  @param {string} seed 随机种子。四个可读ASCII字符，例如：a#B9
   */
  clientAuth(clientId, secretKeyHash, seed) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType
      },
      url: '/client/auth',
      data: JSON.stringify({
        client_id: clientId,
        secret_key_hash: secretKeyHash,
        seed: seed
      })
    })
  }
  /**
   *
   *  一体机登录
   *
   *  @param {string} account 账户
   *  @param {string} password 密码
   *  @param {string} machineUuid 机器唯一标识
   */
  signIn(account, password, machineUuid) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization
      },
      url: '/account/signin',
      data: JSON.stringify({
        account,
        password,
        machine_uuid: machineUuid
      })
    })
  }
  /**
   *
   *  一体机提交智能分析
   *
   *  @param {integer} recordId 测量流水号
   *  @param {integer} cid 测量流水号
   *  @param {string} analysisSession 智能分析会话信息（如果有问询需要在后续请求中填写该字段）
   *  @param {Array.Object} answers
   *  @param {string} answers.question_key 问题唯一标识
   *  @param {string} answers.values 答案
   *  @param {string} answers.userId 用户ID
   */
  submitRecordAnalyze(recordId, cid, analysisSession, answers, userId) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken
      },
      url: '/measurements/' + recordId + '/analyze',
      data: JSON.stringify({
        cid: cid,
        analysis_session: analysisSession,
        answers: answers,
        user_id: userId
      })
    })
  }
  /**
   *
   *  一体机获取分析报告页面
   *
   *  @param {integer} recordId 测量流水号
   */
  getRecordAnalyze(recordId) {
    return axios({
      method: 'get',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken
      },
      url: '/measurements/' + recordId + '/analyze'
    })
  }
}

class ApiWx {
  /**
   *
   *  微信回调
   *
   *  @param {string} url 当前页面 URL 地址（#之前) https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
   */
  getJsSdkConfig(url) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType
      },
      url: '/wx/api/jssdk/config',
      data: JSON.stringify({
        url
      })
    })
  }
  /**
   *
   *  查看微信测量历史记录
   *
   */
  getRecordHistory() {
    return axios({
      method: 'get',
      headers: {
        'Content-Type': contentType
      },
      url: '/wx/api/measurements'
    })
  }
  /**
   *
   *  微信修改测量备注
   *
   *  @param {integer} recordId 测量流水号
   *  @param {string} remark 备注
   */
  updateRemark(recordId, remark) {
    return axios({
      method: 'put',
      headers: {
        'Content-Type': contentType
      },
      url: '/wx/api/measurements/' + recordId + '/remark',
      data: JSON.stringify({
        remark: remark
      })
    })
  }
  /**
   *
   *  微信获取分析报告页面
   *
   *  @param {integer} recordId 测量流水号
   */
  getRecordAnalyze(recordId) {
    return axios({
      method: 'get',
      headers: {
        'Content-Type': contentType
      },
      url: '/wx/api/measurements/' + recordId + '/analyze'
    })
  }
  /**
   *
   * 微信获取分享分析报告页面
   *
   *  @param {string} token 分享的token
   */
  getShareRecordAnalyze(token) {
    return axios({
      method: 'get',
      headers: {
        'Content-Type': contentType
      },
      url: '/wx/api/measurements/token/' + token + '/analyze'
    })
  }
  /**
   *
   *  微信获取分享token
   *
   *  @param {integer} recordId 测量流水号
   */
  getToken(recordId) {
    return axios({
      method: 'get',
      headers: {
        'Content-Type': contentType
      },
      url: '/wx/api/measurements/' + recordId + '/token'
    })
  }
  /**
   *
   *  微信支付接口
   *
   *  @param {integer} recordId 测量流水号
   */
  makePayment(recordId) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType
      },
      url: '/wx/api/payment',
      data: JSON.stringify({
        record_id: recordId
      })
    })
  }
  /**
   *
   *  微信获取词条url前缀
   *
   *  @param {string} version 版本号
   */
  getEntryUrl(version) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType
      },
      url: '/wx/api/res/getUrl',
      data: JSON.stringify({
        app_version: version
      })
    })
  }
}

export { ApiClient, ApiOwner, ApiUsers, ApiJML, ApiWx }
