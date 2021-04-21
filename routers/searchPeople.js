const { Router } = require("express")
const router = Router()
const controller = require("../controlles/searchpeople")

router.get("/search/peoples", controller.searchPeople)
module.exports = router
