const User = require("../models/userModel")
const Function = require("../models/functionModel")

const getProfilePage = async (req, res) => {
    const userFunctions = await Function.find({_id:req.user.publishedFunctions})
    res.render("profile.ejs", {user: req.user, functions: userFunctions })
}

const getEditProfilePage = (req, res) => {
    res.render("editProfileData.ejs", {user: req.user})
}


module.exports = {
    getProfilePage,
    getEditProfilePage
}