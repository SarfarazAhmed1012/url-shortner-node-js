const jwt = require("jsonwebtoken")
const secret = "thisisasecretkey"
function setUser(user) {
    const payload = {
        ...user,
    }

    return jwt.sign(payload, secret)
}

function getUser(token) {
    if (!token) {
        return null
    }
    try {
        return jwt.verify(token, secret)
    } catch (err) {
        return null
    }
}

module.exports = {
    setUser,
    getUser
}