const Bot = require('../models/bot')

module.exports.createBot = async (req, res) => {
  try {
    const { name, ifWrote, message, botId } = req.body

    if (botId) {
      const bot = await new Bot({
        name,
        ifWrote,
        message,
        botId,
      })
      bot.save()
      res.status(201).json({ message: 'create bot' })
    }
  } catch (e) {
    console.log(e)
  }
}
module.exports.getBot = async (req, res) => {
  try {
    if (req.params.id) {
      const bot = await Bot.find({ botId: req.params.id })
      res.status(200).json(bot)
    }
  } catch (e) {
    console.log(e)
  }
}
