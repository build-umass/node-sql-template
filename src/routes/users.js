const knex = require('../database/database')
const router = require('express').Router()
// Probably not the best way to do this in a real app.
// (Unclear what the best way is)
const USERS_TABLE = "users"

// [base] = localhost:[port]/users
// GET [base]/[a username] responds with JSON
// that represents the informtion of the user
// with the given username in the "users"
// table
router.get('/:user', async (req, res) => {
    const user = await knex(USERS_TABLE).where({username: req.params.user}).first()
    res.json(user)
})

// POST [base]/[a username] adds a new
// user with the given information to the "users" table
// if and only if that user does not exist
router.post('/:user', async (req, res) => {
    // TODO: Get the username
    // Find this user in the database
    // Update the row in the database with the new user information
    // This information is stored in the post request body as a JSON string
})

module.exports = router