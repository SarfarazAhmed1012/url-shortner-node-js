const urlModel = require("../models/url.model")
const express = require("express")
const { restrictToRoles } = require("../middlewares/auth")

const router = express.Router()

router.get("/admin/urls", restrictToRoles(["ADMIN"]), async (req, res) => {
    const urls = await urlModel.find().populate("createdBy")
    console.log({ urls })
    return res.render("home", { urls, isAdmin: true })
})
router.get("/", restrictToRoles(["NORMAL", "ADMIN"]), async (req, res) => {
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