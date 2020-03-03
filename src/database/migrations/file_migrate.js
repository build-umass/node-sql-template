// NOTE TO DEVS:
// You can also run "npm run knex migrate:down file_migrate.js" to drop the table
// if you run into any issues.

// Adds a files table that has a relation with the user table
exports.up = async (knex) => {
    return await knex.schema.createTable('files', (table) => {
        table.string('filename');
        table.binary('file');
        table.string('username');
    });
}

// Drops the files table    
exports.down = async (knex) => {
    return await knex.schema.dropTable('files');
}