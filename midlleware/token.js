const jwt = require("jsonwebtoken");
const config = require("config");

const token = (userId) => {
  return () => {
    return jwt.sign({ userId: userId }, config.get("jwtSecret"), {
      expiresIn: "1h",
    });
  };
};
module.exports = token;
