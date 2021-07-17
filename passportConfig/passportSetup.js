const passport = require("passport");
const githubStrategy = require("passport-github2")
const config = require("./config.js")
const User = require("../models/userModel");
const dotenv = require("dotenv").config()


const creatUser = async (data, done) => {
 const realUser = await User.findOne({_id: data._id})
      if(realUser){
        done(null, realUser)  
      }else{
        const user = new User({
            name: data.username, 
            githubID: data.id,
        })
        await user.save()
        done(null, user)
      }
}

passport.serializeUser((user, done)=>{
    done(null, user.id)
})

passport.deserializeUser(async (id, done)=>{
    const user = await User.findById(id)
    done(null, user)
})

passport.use(new githubStrategy({
    clientID: process.env.clientID, 
    clientSecret: process.env.clientSecret,
    callbackURL: "http://localhost:5000/auth/github/callback",
},async (accessToken, refreshToken, data, done)=>{
    console.log(data)
    creatUser(data, done)
}))