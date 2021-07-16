const express = require("express")
const router = express.Router()
const function_controller = require("../controllers/functionController")

router.get("/implement", function_controller.get_implement_page)
router.get("/:name", function_controller.get_function)
router.get("/:name/data", function_controller.get_data)
router.post("/implement", function_controller.post_function)

module.exports = router