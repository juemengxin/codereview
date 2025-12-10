import axios from 'axios'
const contentType = 'application/json'
const urljoin = require('url-join')
// ApiClient web 客户端
class ApiClient {
  /**
   * 提交客户端授权
   *
   * @param {string} clientId 客户端ID
   * @param {string} secretKeyHash 经过 SHA256 签名的 App 授权密钥
   * @param {string} seed 随机种子。四个可读ASCII字符，例如：a#B9
   * @returns
   * @memberof ApiClient
   */
  submitClientAuth(clientId, secretKeyHash, seed) {
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
}
// ApiNotification 通知
class ApiNotification {
  /**
   * Creates an instance of ApiNotification.
   * @param {string} authorization Client验证授权信息
   * @param {string} xAccessToken
   * @memberof ApiNotification
   */
  constructor(authorization, xAccessToken) {
    this.authorization = authorization
    this.xAccessToken = xAccessToken
  }
  /**
   * 手机号获取信息
   *
   * @param {string} type 短信通知类型: signin - 登录短信验证; signup - 注册短信验证; reset_password - 重置密码短信验证;
   * @param {string} phone 手机号
   * @param {string} language 语言
   * @param {string} nationCode 区号
   * @param {boolean} modify 是否是新手机号
   * @param {string} userId userID
   * @returns
   * @memberof ApiNotification
   */
  sendSmsNotification(type, phone, nationCode, language, modify, userId) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken
      },
      url: '/notification/sms',
      data: JSON.stringify({
        sms_notification_type: type,
        phone: phone,
        language: language,
        nation_code: nationCode,
        send_to_new_if_modify: modify,
        user_id: userId
      })
    })
  }
  /**
   * 已登录状态下的邮件通知
   *
   * @param {string} type 邮箱通知类型: set_secure_email - 设置安全邮箱; unset_secure_email - 解绑安全邮箱; modify_secure_email - 修改安全邮箱; find_username - 找回用户名; reset_password - 找回/重置密码;
   * @param {string} email 邮箱号
   * @param {string} language 语言
   * @param {string} userId userID
   * @param {string} modify 是否是新邮箱
   * @returns
   * @memberof ApiNotification
   */
  emailNotification(type, email, language, userId, modify) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken
      },
      url: '/notification/email',
      data: JSON.stringify({
        type: type,
        email: email,
        language: language,
        user_id: userId,
        send_to_new_if_modify: modify
      })
    })
  }
}
// sign in 登录
class ApiSignIn {
  /**
   * Creates an instance of ApiSignIn.
   * @param {string} authorization Client验证授权信息
   * @memberof ApiSignIn
   */
  constructor(authorization) {
    this.authorization = authorization
  }
  /**
   * 登录
   *
   * @param {string} method 登录方式: phone_mvc - 手机验证码登录; username_password - 用户名密码登录; phone_password - 手机密码登录;
   * @param {string} username 用户名
   * @param {string} phone 手机号
   * @param {string} mvc 验证码
   * @param {string} password 密码 SHA256 encoded
   * @param {string} seed 随机种子。四个可读ASCII字符，例如：a#B9
   * @param {string} serialNumber 序列号
   * @param {string} nationCode 区号
   * @param {string} machine 登录机器
   * @returns
   * @memberof ApiSignIn
   */
  signIn(
    method,
    username,
    phone,
    mvc,
    password,
    seed,
    serialNumber,
    nationCode,
    machine
  ) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization
      },
      url: '/signin',
      data: JSON.stringify({
        sign_in_method: method,
        username: username,
        phone: phone,
        mvc: mvc,
        hashed_password: password,
        seed: seed,
        serial_number: serialNumber,
        nation_code: nationCode,
        sign_in_machine: machine
      })
    })
  }
  /**
   * 获取登录二维码
   *
   * @returns
   * @memberof ApiSignIn
   */
  getSigninQRCode() {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization
      },
      url: '/wx/signin/qrcode'
    })
  }
}
// sign up 注册
class ApiSignUp {
  /**
   *Creates an instance of ApiSignUp.
   * @param {string} authorization
   * @memberof ApiSignUp
   */
  constructor(authorization) {
    this.authorization = authorization
  }
  /**
   * 使用验证码注册
   *
   * @param {string} verificationNumber 验证码
   * @param {string} phone 手机号
   * @param {string} nationCode 区号
   * @param {string} plainPassword 密码
   * @param {object} userProfile 个人资料
   * @param {string} language 语音
   * @returns
   * @memberof ApiSignUp
   */
  signUpViaMVC(
    verificationNumber,
    phone,
    nationCode,
    plainPassword,
    userProfile,
    language
  ) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization
      },
      url: '/signup/verification_number',
      data: JSON.stringify({
        verification_number: verificationNumber,
        phone: phone,
        nation_code: nationCode,
        plain_password: plainPassword,
        user_profile: userProfile,
        language: language
      })
    })
  }
}
// language 语言
class ApiLanguage {
  /**
   *Creates an instance of ApiLanguage.
   * @param {string} authorization
   * @param {string} xAccessToken
   * @memberof ApiLanguage
   */
  constructor(authorization, xAccessToken) {
    this.authorization = authorization
    this.xAccessToken = xAccessToken
  }
  /**
   * 得到显示语言
   *
   * @param {string} userId
   * @returns
   * @memberof ApiLanguage
   */
  getDisplayLanguage(userId) {
    return axios({
      method: 'get',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken
      },
      url: urljoin('/user/', userId, '/language')
    })
  }
  /**
   * 设置显示语言
   *
   * @param {string} language 语言
   * @param {string} userId 用户ID
   * @returns
   * @memberof ApiLanguage
   */
  setDisplayLanguage(userId, language) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken
      },
      url: urljoin('/user/', userId, '/language'),
      data: JSON.stringify({
        language: language
      })
    })
  }
}
// user 用户
class ApiUser {
  /**
   * Creates an instance of ApiUser.
   * @param {string} authorization
   * @param {string} xAccessToken
   * @memberof ApiUser
   */
  constructor(authorization, xAccessToken) {
    this.authorization = authorization
    this.xAccessToken = xAccessToken
  }
  /**
   * 获取用户的个人档案
   *
   * @param {string} userId 用户ID
   * @returns
   * @memberof ApiUser
   */
  getUserProfile(userId) {
    return axios({
      method: 'get',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken
      },
      url: urljoin('/user/', userId, '/profile')
    })
  }
  /**
   * 修改个人档案
   *
   * @param {string} userId 用户ID
   * @param {string} nickname 客户昵称
   * @param {string} birthday 生日 UTC 格式 （可选）
   * @param {string} gender 性别
   * @param {string} height 身高（必填）单位厘米
   * @param {string} weight 体重（必填）单位厘米
   * @returns
   * @memberof ApiUser
   */
  modifyUserProfile(userId, nickname, birthday, gender, height, weight) {
    return axios({
      method: 'put',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken
      },
      url: urljoin('/user/', userId, '/profile'),
      data: JSON.stringify({
        nickname: nickname,
        birthday: birthday,
        gender: gender,
        height: height,
        weight: weight
      })
    })
  }
  /**
   * 用户设置密码
   *
   * @param {string} userId 用户ID
   * @param {string} plainPassword 密码
   * @returns
   * @memberof ApiUser
   */
  userSetPassword(userId, plainPassword) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken
      },
      url: urljoin('/user/', userId, '/password'),
      data: JSON.stringify({
        plain_password: plainPassword
      })
    })
  }
  /**
   * 用户修改密码
   *
   * @param {string} userId 用户ID
   * @param {string} oldHashedPassword 新密码
   * @param {string} newPlainPassword 旧密码
   * @param {string} seed 随机种子。四个可读ASCII字符，例如：a#B9
   * @returns
   * @memberof ApiUser
   */
  userModifyPassword(userId, oldHashedPassword, newPlainPassword, seed) {
    return axios({
      method: 'put',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken
      },
      url: urljoin('/user/', userId, '/password'),
      data: JSON.stringify({
        old_hashed_password: oldHashedPassword,
        new_plain_password: newPlainPassword,
        seed: seed
      })
    })
  }
  /**
   * 用户的设置用户名
   *
   * @param {string} userId 用户ID
   * @param {string} username 用户名
   * @returns
   * @memberof ApiUser
   */
  userSetUsername(userId, username) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken
      },
      url: urljoin('/user/', userId, '/username'),
      data: JSON.stringify({
        username: username
      })
    })
  }
  /**
   * 选择区域
   *
   * @param {string} userId 用户ID
   * @param {string} region 区域: 0 - 中国大陆含港澳(默认值); 1 - 中国台湾; 2 - 海外地区;
   */
  userSelectRegion(userId, region) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken
      },
      url: '/user/region',
      data: JSON.stringify({
        user_id: userId,
        region: region
      })
    })
  }
  /**
   * 获取所有密保问题列表
   *
   * @param {string} userId 用户ID
   */
  userGetSecureQuestionList(userId) {
    return axios({
      method: 'get',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken
      },
      url: urljoin('/user/', userId, '/secure_question_list')
    })
  }
  /**
   * 用户首次设置密保问题
   *
   * @param {*} userId 用户ID
   * @param {*} secureQuestions 问题列表
   */
  userSetSecureQuestion(userId, secureQuestions) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken
      },
      url: urljoin('/user/', userId, '/set_secure_question'),
      data: JSON.stringify({
        secure_questions: secureQuestions
      })
    })
  }
  /**
   * 修改密保前获取已设置密保列表
   *
   * @param {string} userId 用户ID
   */
  getSecureQuestionToModify(userId) {
    return axios({
      method: 'get',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken
      },
      url: urljoin('/user/', userId, '/secure_question_to_modify')
    })
  }
  /**
   * 修改密保问题前验证原来的密保问题
   *
   * @param {*} userId 用户ID
   * @param {*} secureQuestions 问题列表
   */
  validateSecureQuestionBeforeModifyQuestion(userId, secureQuestions) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken
      },
      url: urljoin('/user/', userId, '/validate_question_before_modify'),
      data: JSON.stringify({
        secure_questions: secureQuestions
      })
    })
  }
  /**
   * 修改密保问题
   *
   * @param {*} userId 用户ID
   * @param {*} oldSecureQuestions 老问题列表
   * @param {*} newSecureQuestions 新问题列表
   */
  modifySecureQuestion(userId, oldSecureQuestions, newSecureQuestions) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken
      },
      url: urljoin('/user/', userId, '/modify_secure_question'),
      data: JSON.stringify({
        old_secure_questions: oldSecureQuestions,
        new_secure_questions: newSecureQuestions
      })
    })
  }
  /**
   * 用户设置安全邮箱
   *
   * @param {string} userId 用户ID
   * @param {string} verificationCode 验证码
   * @param {string} serialNumber 流水号
   * @param {string} email 邮箱
   */
  userSetEmail(userId, verificationCode, serialNumber, email) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken
      },
      url: urljoin('/user/', userId, '/safe_email'),
      data: JSON.stringify({
        verification_code: verificationCode,
        serial_number: serialNumber,
        email: email
      })
    })
  }
  /**
   * 用户解除设置安全邮箱
   *
   * @param {string} userId 用户ID
   * @param {string} verificationCode 验证码
   * @param {string} serialNumber 流水号
   * @param {string} email 邮箱
   */
  userUnsetEmail(userId, verificationCode, serialNumber, email) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken
      },
      url: urljoin('/user/', userId, '/safe_email/delete'),
      data: JSON.stringify({
        verification_code: verificationCode,
        serial_number: serialNumber,
        email: email
      })
    })
  }
  /**
   * 验证邮箱验证码是否正确
   *
   * @param {string} verificationCode 验证码
   * @param {string} serialNumber 流水号
   * @param {string} email 邮箱
   * @param {string} verificationType reset_password modify_secure_email
   */
  validateEmailVerificationCode(
    verificationCode,
    serialNumber,
    email,
    verificationType
  ) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization
      },
      url: '/user/validate_email_verification_code',
      data: JSON.stringify({
        verification_code: verificationCode,
        serial_number: serialNumber,
        email: email,
        verification_type: verificationType
      })
    })
  }
  /**
   * 修改安全邮箱
   *
   * @param {string} userId 用户ID
   * @param {string} newVerificationCode 验证码
   * @param {string} mewSerialNumber 流水号
   * @param {string} newEmail 新的邮箱
   * @param {string} oldEmail 旧的邮箱
   * @param {string} oldVerificationNumber 旧的邮箱验证号
   */
  modifySecureEmail(
    userId,
    newVerificationCode,
    mewSerialNumber,
    newEmail,
    oldEmail,
    oldVerificationNumber
  ) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken
      },
      url: urljoin('/user/', userId, '/modify_secure_email'),
      data: JSON.stringify({
        new_verification_code: newVerificationCode,
        new_serial_number: mewSerialNumber,
        new_email: newEmail,
        old_email: oldEmail,
        old_verification_number: oldVerificationNumber
      })
    })
  }
  /**
   * 设置登录手机号码
   *
   * @param {string} userId 用户ID
   * @param {string} mvc 验证码
   * @param {string} phone 手机号
   * @param {string} serialNumber 序列号
   * @param {string} nationCode 区号
   * @returns
   * @memberof ApiSignUp
   */
  setSigninPhone(userId, mvc, phone, serialNumber, nationCode) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken
      },
      url: urljoin('/user/', userId, '/signin_phone'),
      data: JSON.stringify({
        mvc: mvc,
        phone: phone,
        serial_number: serialNumber,
        nation_code: nationCode
      })
    })
  }
  /**
   * 验证登录手机号码
   *
   * @param {string} userId 用户ID
   * @param {string} mvc 验证码
   * @param {string} phone 手机号
   * @param {string} serialNumber 序列号
   * @param {string} nationCode 区号
   * @param {string} verificationType 类型
   * @returns
   * @memberof ApiSignUp
   */
  validateSigninPhone(
    userId,
    mvc,
    phone,
    serialNumber,
    nationCode,
    verificationType
  ) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken
      },
      url: '/validate_signin_phone',
      data: JSON.stringify({
        mvc: mvc,
        phone: phone,
        serial_number: serialNumber,
        nation_code: nationCode,
        verification_type: verificationType
      })
    })
  }
  /**
   * 修改登录手机号码
   *
   * @param {string} userId 用户ID
   * @param {string} mvc 验证码
   * @param {string} phone 手机号
   * @param {string} serialNumber 序列号
   * @param {string} nationCode 区号
   * @returns
   * @memberof ApiSignUp
   */
  modifySigninPhone(
    userId,
    mvc,
    phone,
    serialNumber,
    nationCode,
    oldPhone,
    oldNationCode,
    verificationNumber
  ) {
    return axios({
      method: 'put',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken
      },
      url: urljoin('/user/', userId, '/signin_phone'),
      data: JSON.stringify({
        mvc: mvc,
        phone: phone,
        serial_number: serialNumber,
        nation_code: nationCode,
        old_phone: oldPhone,
        old_nation_code: oldNationCode,
        verification_number: verificationNumber
      })
    })
  }
  /**
   * 根据邮箱找回用户名
   *
   * @param {string} verificationCode 验证码
   * @param {string} serialNumber 流水号
   * @param {string} email 邮箱
   */
  findUsernameBySecureEmail(verificationCode, serialNumber, email) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization
      },
      url: '/user/find_username_by_email',
      data: JSON.stringify({
        verification_code: verificationCode,
        serial_number: serialNumber,
        email: email
      })
    })
  }
  /**
   * 根据验证码重置密码
   *
   * @param {string} userId 用户ID
   * @param {string} plainPassword 密码
   * @param {string} verificationNumber 验证码
   * @param {string} verificationType 类型
   */
  userResetPasswordViaVC(
    userId,
    plainPassword,
    verificationNumber,
    verificationType
  ) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization
      },
      url: urljoin('/user/', userId, '/reset_password'),
      data: JSON.stringify({
        plain_password: plainPassword,
        verification_number: verificationNumber,
        verification_type: verificationType
      })
    })
  }
  /**
   * 根据密保问题修改密码前验证手机号码或者用户名是否存在
   *
   * @param {string} username 用户名
   * @param {string} phone 手机号
   * @param {string} nationCode 验证码
   * @param {string} verificationType 区号
   */
  ValidateUsernameOrPhone(verificationType, username, phone, nationCode) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization
      },
      url: '/user/validate_username_or_phone',
      data: JSON.stringify({
        validation_type: verificationType,
        username: username,
        phone: phone,
        nation_code: nationCode
      })
    })
  }
  /**
   * 根据用户名或者手机号获取当前设置的密保问题
   *
   * @param {string} username 用户名
   * @param {string} phone 手机号
   * @param {string} nationCode 验证码
   * @param {string} verificationType 区号
   */
  GetCurrentSecureQuestionList(verificationType, username, phone, nationCode) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization
      },
      url: '/user/secure_question',
      data: JSON.stringify({
        validation_type: verificationType,
        username: username,
        phone: phone,
        nation_code: nationCode
      })
    })
  }
  /**
   * 根据密保问题修改密码前验证回答的密保问题是否正确
   *
   * @param {string} username 用户名
   * @param {string} phone 手机号
   * @param {string} nationCode 验证码
   * @param {string} verificationType 区号
   * @param {string} secureQuestions 问题列表
   */
  ValidateSecureQuestionBeforeModifyPassword(
    verificationType,
    username,
    phone,
    nationCode,
    secureQuestions
  ) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization
      },
      url: '/user/validate_question_before_modify_password',
      data: JSON.stringify({
        validation_type: verificationType,
        username: username,
        phone: phone,
        nation_code: nationCode,
        secure_questions: secureQuestions
      })
    })
  }
  /**
   * 根据密保问题修改密码
   *
   * @param {string} username 用户名
   * @param {string} phone 手机号
   * @param {string} nationCode 验证码
   * @param {string} verificationType 区号
   * @param {string} password 密码
   * @param {string} secureQuestions 问题列表
   */
  ResetPasswordViaSecureQuestion(
    verificationType,
    username,
    phone,
    nationCode,
    password,
    secureQuestions
  ) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization
      },
      url: '/user/modify_password_via_question',
      data: JSON.stringify({
        validation_type: verificationType,
        username: username,
        phone: phone,
        nation_code: nationCode,
        password: password,
        secure_questions: secureQuestions
      })
    })
  }
  /**
   * 获取资源列表
   *
   */
  getResList() {
    return axios({
      method: 'get',
      headers: {
        'Content-Type': contentType
      },
      url: '/resource'
    })
  }
  /**
   * 得到正在使用的服务
   *
   * @param {string} userId 用户ID
   */
  getUsingServices(userId) {
    return axios({
      method: 'get',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken
      },
      url: urljoin('/user/', userId, '/services')
    })
  }
  /**
   * 得到登录的机器
   *
   * @param {string} userId 用户ID
   */
  getSignInMachines(userId) {
    return axios({
      method: 'get',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken
      },
      url: urljoin('/user/', userId, '/sign_in_machines')
    })
  }
  /**
   * 注册时验证手机验证码是否正确
   *
   * @param {string} mvc 验证码
   * @param {string} phone 手机号
   * @param {string} serialNumber 序列号
   * @param {string} nationCode 区号
   * @returns
   * @memberof ApiUser
   */
  validatePhoneVerificationCode(mvc, phone, serialNumber, nationCode) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization
      },
      url: '/user/validate_phone_verification_code',
      data: JSON.stringify({
        mvc: mvc,
        phone: phone,
        serial_number: serialNumber,
        nation_code: nationCode
      })
    })
  }
}
// 设备
class ApiDevice {
  /**
   * Creates an instance of ApiDevice.
   * @param {string} authorization
   * @param {string} xAccessToken
   * @memberof ApiDevice
   */
  constructor(authorization, xAccessToken) {
    this.authorization = authorization
    this.xAccessToken = xAccessToken
  }
  /**
   * 用户得到使用的device
   *
   * @param {string} userId 用户ID
   * @returns
   * @memberof ApiUser
   */
  userGetDevice(userId) {
    return axios({
      method: 'get',
      headers: {
        'Content-Type': contentType,
        Authorization: this.authorization,
        'X-Access-Token': this.xAccessToken
      },
      url: urljoin('/user/', userId, '/devices')
    })
  }
}
export {
  ApiClient,
  ApiNotification,
  ApiSignIn,
  ApiSignUp,
  ApiLanguage,
  ApiUser,
  ApiDevice
}
