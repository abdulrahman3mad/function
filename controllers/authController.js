const get_login_page = async (req, res) => {
    res.render("login.ejs")
}

const get_signup_page = (req, res) => {
    res.render("signup.ejs")
}

const get_github_consent = (req, res) => {
    res.redirect("/auth/github/callback")
}

const get_github_data = (req, res) => {
    console.log(req.user)
    res.redirect("/")
}
const logout = (req, res) => {
    req.session = null
    req.logout()
    res.redirect("/auth/login")
}

module.exports = {
    get_login_page,
    get_signup_page,
    get_github_consent,
    get_github_data,
    logout,
}