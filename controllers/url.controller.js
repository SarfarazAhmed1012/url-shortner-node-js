// const { nanoid } = require('nanoid')
const shortid = require('shortid')
const urlModel = require('../models/url.model')

async function generateShortUrl(req, res) {
    const body = req.body
    console.log(body)
    if (!body.url) {
        return res.status(400).json({
            message: "url is required"
        })
    }
    const nanoId = shortid(8)

    const url = await urlModel.create({
        shortUrl: nanoId,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id
    })

    return res.render("home", { id: nanoId })

}

async function getRedirectUrl(req, res) {
    const shortId = req.params.shortId

    if (!shortId) {
        return res.status(400).json({
            message: "shortId is required"
        })
    }
    const url = await urlModel.findOne({ shortUrl: shortId })

    if (!url) {
        return res.status(404).json({
            message: "url not found"
        })
    }

    url.visitHistory.push({ timestamp: Date.now() })
    await url.save()

    res.redirect(url.redirectUrl)
}

async function getAllUrls(req, res) {
    const urls = await urlModel.find()
    return res.render("home", { urls })
}


module.exports = {
    generateShortUrl,
    getRedirectUrl,
    getAllUrls
}
