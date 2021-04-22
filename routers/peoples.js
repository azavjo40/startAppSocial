const { Router } = require("express")
const router = Router()
const controller = require("../controlles/peoples")

router.get("/search/peoples", controller.searchPeople)
module.exports = router
