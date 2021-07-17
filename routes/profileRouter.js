const profileRouter = require("express").Router()
const profileController = require("../controllers/profileController")

profileRouter.get("/:name", profileController.getProfilePage)
profileRouter.get("/:name/edit", profileController.getEditProfilePage)
profileRouter.post("/:name", profileController.updateData)

module.exports = profileRouter

