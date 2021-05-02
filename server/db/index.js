//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/user')
const Meme = require('./models/meme')
//associations could go here!

Meme.belongsTo(User)
User.hasMany(Meme)

module.exports = {
  db,
  models: {
    User,
    Meme
  },
}
