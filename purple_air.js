const { aqiApiKey, sensorIndex } = require('./config');
const { pmToAqi } = require('./utils');

async function getSensorData() {
  // return Math.floor(Math.random() * 200);
  const url = `https://api.purpleair.com/v1/sensors/${sensorIndex}?fields=pm2.5_10minute`;
  const response = await fetch(url, {
    headers: {
      'X-API-Key': aqiApiKey,
    },
  });
  const sensor_data = await response.json();
  const pm = await sensor_data['sensor']['stats']['pm2.5_10minute'];
  aqi = pmToAqi(pm);
  return aqi;
}

module.exports = { getSensorData };
