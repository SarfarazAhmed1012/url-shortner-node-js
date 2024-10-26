const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const urlRoutes = require("./routes/url.route.js")
const staticRoute = require("./routes/staticRoute.js")
const userRoutes = require("./routes/user.route.js")
const { connect } = require("./connection.js")
const { restrictToLoggedInUser, checkAuth } = require("./middlewares/auth.js")
const app = express()
const PORT = 8001

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.get("/", (req, res) => {
//     res.render("home")
// })
app.use("/", checkAuth, staticRoute)
app.use("/url", restrictToLoggedInUser, urlRoutes)
app.use("/user", userRoutes)

connect("mongodb+srv://sarfarazahmed1012:18QXhec3Af7NcJY9@cluster0.6khnm.mongodb.net/").then(() => {
    console.log("Connected to database")
}).catch((err) => {
    console.log(err)
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})