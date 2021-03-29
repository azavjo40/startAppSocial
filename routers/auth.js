const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const passport = require("passport");
const controller = require("../controlles/auth");
const upload = require("../midlleware/upload");
router.post(
  "/register",
  upload.single("file"),
  [
    check("email", "Please enter email").isEmail(),
    check("password", "Please enter password min 6 dgits").isLength({ min: 6 }),
    check("name", "Please enter name").exists(),
  ],
  controller.register
);

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").normalizeEmail().isEmail(),
    check("password", "Please enter password"),
  ],
  controller.login
);

router.get(
  "/get/user/page/:userId",
  passport.authenticate("jwt", { session: false }),
  controller.getUserPage
);

router.post(
  "/refresh/token",
  passport.authenticate("jwt", { session: false }),
  controller.refreshToken
);

module.exports = router;
