const { Router } = require('express')
const router = Router()
const controller = require('../controlles/bot')
const passport = require('passport')

router.post(
  '/create/bot',
  passport.authenticate('jwt', { session: false }),
  controller.createBot
)
router.get(
  '/get/bot/:id',
  passport.authenticate('jwt', { session: false }),
  controller.getBot
)
router.delete(
  '/remove/bot/:id',
  passport.authenticate('jwt', { session: false }),
  controller.removeBote
)
module.exports = router
