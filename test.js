const test = require('node:test');
const assert = require('assert');
const { pmToAqi } = require('./utils');

test('PM to AQI', () => {
  assert.strictEqual(pmToAqi(6), 25);
  assert.strictEqual(pmToAqi(35), 99);
  assert.strictEqual(pmToAqi(46), 127);
  assert.strictEqual(pmToAqi(105), 177);
  assert.strictEqual(pmToAqi(165), 215);
  assert.strictEqual(pmToAqi(600), 500);
});