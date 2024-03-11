const { aqiApiKey, sensorIndex } = require('./config');
const { pmToAqi } = require('./utils');

async function getSensorData() {
  const url = `https://api.purpleair.com/v1/sensors/${sensorIndex}?fields=pm2.5_10minute`;
  try {
    const response = await fetch(url, {
      headers: {
        'X-API-Key': aqiApiKey,
      },
    });
    const sensor_data = await response.json();
    const pm = await sensor_data['sensor']['stats']['pm2.5_10minute'];
    aqi = pmToAqi(pm);
    return aqi;
  } catch (error) {
    console.log(error)
    return null
  }
}

module.exports = { getSensorData };
