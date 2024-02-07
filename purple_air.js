const { aqiApiKey, sensorIndex } = require('./config');
const { ppmToAqi } = require('./utils');

async function getSensorData() {
  // return 25
  const url = `https://api.purpleair.com/v1/sensors/${sensorIndex}?fields=pm2.5_10minute`;
  const response = await fetch(url, {
    headers: {
      'X-API-Key': aqiApiKey,
    },
  });
  const sensor_data = await response.json();
  const ppm = await sensor_data['sensor']['stats']['pm2.5_10minute'];
  aqi = ppmToAqi(ppm);
  return aqi;
}

module.exports = { getSensorData };
