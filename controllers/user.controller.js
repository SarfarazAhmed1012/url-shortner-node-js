const User = require("../models/user.model")
const { setUser } = require("../services/auth")
async function signUp(req, res) {
    try {
        console.log("i ran")
        const { name, email, password } = req.body
        await User.create({ name, email, password })
        return res.render("home")
    } catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
}

async function signIn(req, res) {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).send("User not found")
        }
        if (user.password !== password) {
            return res.status(400).send("Incorrect password")
        }

        const token = setUser(user)
        res.cookie("sessionId", token)
        return res.redirect("/")
    } catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
}

module.exports = {
    signUp,
    signIn
}