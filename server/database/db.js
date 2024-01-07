const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig);

const tableName = 'votes';

// Check if the table exists
db.schema
  .hasTable(tableName)
  .then((exists) => {
    if (!exists) {
      // If table doesn't exist, create it
      return db.schema.createTable(tableName, (table) => {
        table.increments('id');
        table.string('name');
        table.boolean('voting_choice');
        table.date('casted_at');
      });
    } else {
      console.log('Table already exists');
    }
  })
  .then(() => {
    console.log('Table created or already exists');
  })
  .catch((err) => {
    console.error('Error:', err);
    throw err;
  });

module.exports = db;
