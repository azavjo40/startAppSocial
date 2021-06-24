const { Router } = require('express')
const router = Router()
const controller = require('../controlles/message')
const passport = require('passport')

router.get(
  '/search/peoples',
  passport.authenticate('jwt', { session: false }),
  controller.searchPeople
)
router.get(
  '/get/messages/:id',
  passport.authenticate('jwt', { session: false }),
  controller.getMessages
)

router.post(
  '/chat/unread/msg/read',
  passport.authenticate('jwt', { session: false }),
  controller.unreadMsgRead
)
module.exports = router
