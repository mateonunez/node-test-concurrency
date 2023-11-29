const { clearData, createAndSelectData, end } = require('../index.js');
const { test } = require('node:test')
const assert = require('node:assert/strict');

test('should create and select data', async () => {
  test.after(() => {
    end();
  })

  await clearData();

  const res = await createAndSelectData();

  assert.deepEqual(res, [
    { id: 1, name: 'Name1' },
    { id: 2, name: 'Name2' },
  ]);
})

