const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  devEmail: process.env.DEV_EMAIL,
  personalEmail: process.env.PERSONAL_EMAIL,
  emailPassword: process.env.EMAIL_PASSWORD,
  testVar: process.env.TEST_VAR,
  aqiApiKey: process.env.PURPLE_AIR_API_KEY,
  sensorIndex: process.env.SENSOR_INDEX,
};
