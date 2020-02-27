require('dotenv').config({ 
    // find-config recursively searches parent directories until the .env file is found.
    // It returns the path to the .env file.
    path: require('find-config')('.env')
})
// Environment variables in the .env file are loaded
// into process.env, which is accessible anywhere in the app
const env = process.env
// Extract the useful environment variables for convenience
module.exports = {
    database: {
        user: env.DB_user,
        host: env.DB_host,
        database: env.DB_name,
        password: env.DB_password,
        port: env.DB_port
    }
}