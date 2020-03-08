const knex = require('../database/database')
const express = require('express')
const router = express.Router()
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
// or updates an existing user
// Example client request:
//curl -X POST -d '{"oranges":12}' -H "Content-Type: application/json"  http://localhost:8080/users/bill
router.post('/:user', express.json(), async (req, res) => {
    if (req.body === undefined || req.body.oranges === undefined) {
        // TODO:
        // throw an exception (for middleware to handle later)
        // OR set the status code to 400 (Bad Request)
        // and use res.json/res.send an appropriate error message
    }
    const oranges = req.body.oranges
    const user = req.params.user

    // Possible TODO: This requires 2 SQL queries
    // 1. to determine if the user exists
    // 2. to update the relevant information
    // A solution involves using "upsert" (INSERT ... ON CONFLICT)
    const rows = await knex(USERS_TABLE).where({username: user})
    if (rows.length === 0) {
        await knex(USERS_TABLE).insert({username: user, oranges: oranges})
    } else {
        await knex(USERS_TABLE).where({username: user}).update({oranges: oranges})
    }
    // TODO: figure out a return convention.
    // Should we return a JSON response with a "status" field?
    res.json({status: 200})
})

module.exports = router