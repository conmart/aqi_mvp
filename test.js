const { test } = require('node:test');
const assert = require('assert');
const { pmToAqi, calcTimeout } = require('./utils');
const { maxTimeout, minTimeout, recoveryTimeout } = require('./config');

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
  const miscTimeout = minTimeout + 5;
  // If new aqi is within 5-10 points of last reading, don't change timeout
  assert.strictEqual(calcTimeout(0, 6, miscTimeout), miscTimeout);
  // If new aqi is within 4 points of last reading, double timeout between checks
  assert.strictEqual(calcTimeout(4, 0, miscTimeout), miscTimeout * 2);
  // Timeout should never exceed maxTimeout
  assert.strictEqual(calcTimeout(10, 10, maxTimeout + 10), maxTimeout);
  // If new aqi is >10 points of last reading reduce timeout to minimum
  assert.strictEqual(calcTimeout(10, 50, miscTimeout), minTimeout);
  // If no aqi is returned, default to recovery timeout
  assert.strictEqual(calcTimeout(null, 35, miscTimeout), recoveryTimeout);
  // If no last reading is found, default to recovery timeout
  assert.strictEqual(calcTimeout(35, null, miscTimeout), recoveryTimeout);
});
