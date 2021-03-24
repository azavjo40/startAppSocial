const config = require("config");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get("jwtSecret"),
};
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(option, async (payload, done) => {
      try {
        const user = await User.findById(payload.userId).select("email id");
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (e) {
        console.log(e);
      }
    })
  );
};
