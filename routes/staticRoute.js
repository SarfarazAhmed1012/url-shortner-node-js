const express = require("express")
const urlModel = require("../models/url.model")

const router = express.Router()

router.get("/", async (req, res) => {
    if (!req.user) {
        return res.redirect("/login")
    }


    const urls = await urlModel.find({ createdBy: req.user._id })
    return res.render("home", { urls })
})

router.get("/signup", async (req, res) => {
    return res.render("signUp")
})

router.get("/login", async (req, res) => {
    return res.render("login")
})
module.exports = router