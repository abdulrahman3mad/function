const express = require("express")
const functions = require("../models/functionModel")
const User = require("../models/userModel")

const get_implement_page = (req, res) => {
    res.render("implement.ejs", {user: req.user})
}

const post_function = async (req, res) => {
    const func = new functions({
        name: req.body.name,
        content: req.body.content,
        description: req.body.description,
        lang: req.body.lang
    })
    try{
        await func.save()
        let user = await User.findById(req.user._id)
        user.publishedFunctions.push(func._id)
        await user.save()
        res.redirect("/")
    }catch(error){
        console.log(error)
        res.render("404page.ejs")
    }
}

const get_data = async (req, res) => {
    try{
        const function_name = req.params.name
        console.log(function_name);
        const func = await functions.findOne({name: function_name})
        res.send(func)
    }catch(err){
        console.log(err)
        res.render("404page.ejs")
    }
}

const get_function = async (req, res) => {
    try{
        const singalFunction = await functions.findOne({name: req.params.name})
        console.log(singalFunction)
        const visitor = await User.findOne({publishedFunctions: singalFunction._id})
        res.render("function.ejs", {user: req.user, visitor: visitor })
    }catch(err){
        console.log(err)
        res.render("404page.ejs")
    }
}

module.exports = {
    get_implement_page,
    post_function,
    get_data,
    get_function
}