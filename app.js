const express = require("express")
const ejs = require("ejs")
//Routers 
const functionRouter = require("./routes/functionsRouter")
const authRouter = require("./routes/authRouter")
const homeRouter = require("./routes/homeRouter")
const profileRouter = require("./routes/profileRouter")
//---
//middelWare
const authMiddelware = require("./middelWares/authMiddelware")
//---
const mongoose = require("mongoose")
const passportSetup = require("./passportConfig/passportSetup")
const passport = require("passport")
const cookieSession = require("cookie-session")
const dotenv = require("dotenv").config()
const app = express()

//DB connection
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    app.listen(process.env.PORT, () => {
        console.log("listened successfully")
    })    
})
//----

//config
app.use(express.urlencoded())
app.set("view engine", ejs)
app.use(express.static("public"))
app.use(cookieSession({
    name:"great-cookie",
    maxAge:1000*60*60*24,
    keys:[process.env.SESSION_KEY],
}))
app.use(passport.initialize())
app.use(passport.session())
//----

//routes
app.use("/auth", authRouter)
app.use("/profile", authMiddelware, profileRouter)
app.use("/", homeRouter)
app.use("/function", authMiddelware, functionRouter)
//----