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
        lang: req.body.lang,
        author: req.user.name
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
        const func = await functions.findOne({_id: req.params.id})
        res.send(func)
    }catch(err){
        res.render("404page.ejs")
    }
}

const get_function = async (req, res) => {
    try{
        const receivedFunction = await functions.findOne({_id: req.params.id})
        const visitor = await User.findOne({publishedFunctions: receivedFunction._id})
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