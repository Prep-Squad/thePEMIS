
const { db } = require('./db')
const PORT = process.env.PORT || 8409
const app = require('./app')
require('dotenv').config()

const init = async () => {
  try {
    await db.sync()
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
  } catch (ex) {
    console.log(ex)
  }
}


init()


