const { getUser } = require("../services/auth");

function checkForUserAuthentication(req, res, next) {
    console.log("i ran", req.headers?.cookie)
    const authorizationHeaderValue = req.headers?.cookie
    req.user = null

    if (!authorizationHeaderValue) {
        return next()
    }

    const token = authorizationHeaderValue.split("token=")[1]
    const user = getUser(token)
    console.log({ user })
    req.user = user

    next()
}

function restrictToRoles(roles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.redirect("/login")
        }
        console.log(req.user.role, roles)
        if (!roles.includes(req.user.role)) {
            return res.send("Unauthorized")
        }

        next()
    }
}

module.exports = { checkForUserAuthentication, restrictToRoles }