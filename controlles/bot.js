const Bot = require("../models/bot")
module.exports.createBot = async (req, res) => {
  try {
    const { name, ifWrote, answer, botId } = req.body

    if (botId) {
      const bot = await new Bot({
        name,
        ifWrote,
        answer,
        botId,
        date: Date.now(),
      })
      console.log(bot)
      bot.save()
      res.status(201).json({ message: "create bot" })
    }
  } catch (e) {
    console.log(e)
  }
}
