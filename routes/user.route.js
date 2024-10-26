const express = require("express")
const { signUp, signIn } = require("../controllers/user.controller")

const router = express.Router()

router.post("/", signUp)
router.post("/login", signIn)

module.exports = router