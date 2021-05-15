const express = require('express')
const app = express()
const http = require('http').createServer(app)
const config = require('config')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')
const socketIo = require('./routers/socketIo')
app.use('/uploads', express.static('uploads'))
app.use(cors())
app.use(morgan('dev'))
app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routers/auth'))
app.use('/api', require('./routers/bot'))
app.use('/api', require('./routers/message'))
app.use(passport.initialize())
require('./midlleware/passport')(passport)

// if (process.env.NODE_ENV === "production") {
//   app.use("/", express.static(path.join(__dirname, "client", "build")))
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//   })
// }
socketIo(http)()

const PORT = process.env.PORT || config.get('port') || 5000
async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    http.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    )
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}
start()
