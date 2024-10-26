const express = require("express")
const { generateShortUrl, getRedirectUrl, getAllUrls } = require("../controllers/url.controller")
const router = express.Router()

router.post("/", generateShortUrl)
router.get("/:shortId", getRedirectUrl)
router.get("/get-urls/get-urls", getAllUrls)

module.exports = router
