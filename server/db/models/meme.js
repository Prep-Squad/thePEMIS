const Sequelize = require('sequelize')
const db = require('../db')

const Meme = db.define('meme', {
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false
  },
})

module.exports = Meme