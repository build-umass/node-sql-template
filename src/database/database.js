const createKnexClient = require('knex')
const databaseInfo = require('./knexfile').production
module.exports = createKnexClient(databaseInfo)