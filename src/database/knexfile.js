// Export configurations for knex to use when connecting to the database
const config = require('./config')
const connectionInfo = config.database
// Dev and production configuration are the same
// To switch from development to production, change the values in the .env file
module.exports.development = module.exports.production = {
    client: 'pg',
    connection: connectionInfo
}