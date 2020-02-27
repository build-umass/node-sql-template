// Add users table to database
module.exports.seed = async (knex) => {
  const TABLE_NAME = 'users'
  await knex.schema.dropTableIfExists(TABLE_NAME)
  await knex.schema.createTable(TABLE_NAME, table => {
    table.string('username')
    table.integer('oranges').notNullable()
  })
  return knex(TABLE_NAME).del()
          .then(() => {
            return knex(TABLE_NAME).insert([
              {username: 'bart', oranges: 0},
              {username: 'rick', oranges: 5}
            ])
          })
};
