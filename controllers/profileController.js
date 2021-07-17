const User = require("../models/userModel")
const Function = require("../models/functionModel")

const getProfilePage = async (req, res) => {
    try{
        const user = await User.findOne({name: req.params.name})
        const userFunctions = await Function.find({_id: user.publishedFunctions})
        res.render("profile.ejs", {user: req.user, functions: userFunctions, visitor: user })
    }catch{
        res.render("404page.ejs")
    }
}

const getEditProfilePage = (req, res) => {
    res.render("editProfileData.ejs", {user: req.user})
}

const updateData = async (req, res) => {
    newUserData = {}
    console.log(req.body.bio)
    if(req.body.name!= null && req.body.name!="")
        newUserData.name = req.body.name
    if(req.body.bio!= null && req.body.bio!="")
        newUserData.bio = req.body.bio

    await User.updateOne({name: req.user.name}, newUserData)
    res.redirect(`/profile/${req.user.name}`)
    
}
module.exports = {
    getProfilePage,
    getEditProfilePage,
    updateData
}