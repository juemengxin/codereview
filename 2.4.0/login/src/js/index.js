export default {
  validateEmail (email) {
    const emailRegular = /^[A-Za-z0-9!#$%&'+/=?^_{|}~-]+(.[A-Za-z0-9!#$%&'+/=?^_{|}~-]+)*@([A-Za-z0-9]+(?:-[A-Za-z0-9]+)?.)+[A-Za-z0-9]+(-[A-Za-z0-9]+)?$/
    return emailRegular.test(email)
  },
  validatePassword (password) {
    const passwordRegular = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/
    return passwordRegular.test(password)
  },
  validateMobilePhone (areaCode, mobilePhone) {
    let regular = ''
    switch (areaCode) {
      case '+86':
        regular = /^\d{6,11}$/
        break
      default:
        regular = /^\d{7,11}$/
        break
    }
    return regular.test(mobilePhone)
  },
  generateSeed () {
    const seedArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    let seed = seedArr[Math.floor(Math.random() * 62)] + seedArr[Math.floor(Math.random() * 62)] + seedArr[Math.floor(Math.random() * 62)] + seedArr[Math.floor(Math.random() * 62)]
    return seed
  }
}
