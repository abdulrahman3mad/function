const homeRouter = require("express").Router()
const homeController = require("../controllers/homeController")

homeRouter.get("/", homeController.get_home_page)

module.exports = homeRouter

