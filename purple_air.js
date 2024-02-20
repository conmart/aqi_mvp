const { aqiApiKey, sensorIndex } = require('./config');
const { pmToAqi } = require('./utils');

async function getSensorData() {
  console.log('apikey', aqiApiKey);
  console.log('2apikey', api_key);
  const si = 69123;
  const url = `https://api.purpleair.com/v1/sensors/${si}?fields=pm2.5_10minute`;
  const response = await fetch(url, {
    headers: {
      'X-API-Key': aqiApiKey,
    },
  });
  const sensor_data = await response.json();
  console.log(sensor_data)
  // const pm = await sensor_data['sensor']['stats']['pm2.5_10minute'];
  return Math.floor(Math.random() * 20);
  aqi = pmToAqi(pm);
  return aqi;
}

module.exports = { getSensorData };
