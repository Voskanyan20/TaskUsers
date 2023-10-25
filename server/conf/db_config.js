const { Sequelize } = require('sequelize')
const { DB_NAME, DB_USERNAME, PASSWORD, HOST } = require('../configGlobal.js')

const seq = new Sequelize(DB_NAME, DB_USERNAME, PASSWORD, {
  host: HOST,
  dialect: 'mysql'
})

seq
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(error => {
    console.error('Unable to connect to the database: ', error)
  })

const database = {}

database.Sequelize = Sequelize
database.seq = seq
database.user = require('../models/user.js')(seq, Sequelize)
database.keywords = require('../models/keywords.js')(seq, Sequelize)

database.initAssosciacion = () => {
  database.user.hasMany(database.keywords)
  database.keywords.belongsTo(database.user)
}

module.exports = database
