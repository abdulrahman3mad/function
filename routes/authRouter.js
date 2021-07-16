const auth_router = require("express").Router()
const passport = require("passport");
const auth_controller = require("../controllers/authController")

auth_router.get("/login", auth_controller.get_login_page)
auth_router.get("/signup", auth_controller.get_signup_page)
auth_router.get("/github", passport.authenticate("github", {
    scope:["profile"]
}), auth_controller.get_github_consent)
auth_router.get("/github/callback", passport.authenticate("github"), auth_controller.get_github_data)
auth_router.get("/logout", auth_controller.logout)
module.exports = auth_router
