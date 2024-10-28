const CryptoJS = require('crypto-js')

const encode = (password) => {
    return CryptoJS.AES.encrypt(password,process.env.PASS_SEC).toString()
}

const decode = (encryption) => {
    return CryptoJS.AES.decrypt(encryption,process.env.PASS_SEC).toString(CryptoJS.enc.Utf8)
}

module.exports = {encode,decode}