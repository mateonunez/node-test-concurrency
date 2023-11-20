const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

async function createAndSelectData() {
  let client;
  try {
    client = await pool.connect();

    const createTableText = 'CREATE TABLE IF NOT EXISTS test_table (id SERIAL PRIMARY KEY, name VARCHAR(50) NOT NULL)';
    await client.query(createTableText);

    const insertText = 'INSERT INTO test_table (name) VALUES ($1), ($2) RETURNING *';
    await client.query(insertText, ['Name1', 'Name2']);

    const selectText = 'SELECT * FROM test_table';
    const resSelect = await client.query(selectText);

    return resSelect.rows;
  } catch (err) {
    console.error('Error executing query', err.stack);
    throw err;
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function clearData() {
  let client;
  try {
    client = await pool.connect();

    const deleteText = 'DROP TABLE IF EXISTS test_table';
    await client.query(deleteText);

    console.log('Data cleared from test_table');
  } catch (err) {
    console.error('Error executing query', err.stack);
    throw err;
  } finally {
    if (client) {
      client.release();
    }
  }
}

function end() {
  pool.end();
}

module.exports = {
  createAndSelectData,
  clearData,
  end,
};
