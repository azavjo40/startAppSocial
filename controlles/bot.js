const Bot = require("../models/bot")
module.exports.createBot = async (req, res) => {
  try {
    const { name, ifWrote, message, botId } = req.body

    if (botId) {
      const bot = await new Bot({
        name,
        ifWrote,
        message,
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
