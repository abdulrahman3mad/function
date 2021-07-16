const functions = require("../models/functionModel")

const search = (req, res) => {
    let searchResult = {}
    if(req.query.name!=undefined&&req.query.name!=""){
        searchResult.name = new RegExp(req.query.name, "i")
    }
    if(req.query.lang!=undefined&&req.query.lang!="all"){
        searchResult.lang = req.query.lang
    }
    return searchResult
}

const get_home_page = async (req, res) => {
    try{
        let all_functions = await functions.find(search(req))
        res.render("home.ejs", {functions: all_functions, user: req.user})
    }catch(error){
        res.render("404page.ejs")
    }
}

module.exports = {
    get_home_page
}