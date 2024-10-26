const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema(
    {
        shortUrl: {
            type: String,
            required: true
        },
        redirectUrl: {
            type: String,
            required: true
        },
        visitHistory: [{ timestamp: { type: Date } }]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Url", urlSchema)