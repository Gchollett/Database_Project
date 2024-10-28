const jwt = require('jsonwebtoken')

const sign = (payload) => {
    return jwt.sign(payload,process.env.JWT_SEC)
}

const parse = (token) => {
    try{
        return jwt.verify(token,process.env.JWT_SEC)
    }catch(e){
        return ""
    }
}

module.exports = {sign,parse}
