const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: String, 
    password: String,
    githubID: String,
    bio: String,
    publishedFunctions: []
})

const User = mongoose.model("users", userSchema)
module.exports =  User