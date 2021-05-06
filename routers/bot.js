const { Router } = require("express")
const router = Router()
const controller = require("../controlles/bot")
const passport = require("passport")

router.post(
  "/create/bot",
  passport.authenticate("jwt", { session: false }),
  controller.createBot
)
module.exports = router
