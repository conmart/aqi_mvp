const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  emailPassword: process.env.EMAIL_PASSWORD,
  testVar: process.env.TEST_VAR,
  aqiApiKey: process.env.PURPLE_AIR_API_KEY,
  sensorIndex: process.env.SENSOR_INDEX,
};
