const jwt = require('jsonwebtoken')

const sign = (payload) => {
    return jwt.sign(payload,process.env.JWT_SEC)
}

const parse = (token) => {
    return jwt.parse(token,process.env.JWT_SEC)
}

module.exports = {sign,parse}
