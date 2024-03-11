const test = require('node:test');
const assert = require('assert');
const { pmToAqi, calcTimeout } = require('./utils');

test('PM to AQI', () => {
  assert.strictEqual(pmToAqi(-50), 0);
  assert.strictEqual(pmToAqi(6), 25);
  assert.strictEqual(pmToAqi(35), 99);
  assert.strictEqual(pmToAqi(46), 127);
  assert.strictEqual(pmToAqi(105), 177);
  assert.strictEqual(pmToAqi(165), 215);
  assert.strictEqual(pmToAqi(600), 500);
});

test('Timeout calculation', () => {
  assert.strictEqual(calcTimeout(0, 6, 1600000), 1600000);
  assert.strictEqual(calcTimeout(4, 0, 1600000), 3200000);
  assert.strictEqual(calcTimeout(null, 35, 1600000), 3600000);
});
