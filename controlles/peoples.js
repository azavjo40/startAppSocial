const People = require("../models/auth")
module.exports.searchPeople = async (req, res) => {
  try {
    const peoples = await People.find()
    res.status(200).json(peoples)
  } catch (e) {
    console.log(e)
  }
}
