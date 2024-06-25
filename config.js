const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  devEmail: process.env.DEV_EMAIL,
  personalEmail: process.env.PERSONAL_EMAIL,
  emailPassword: process.env.EMAIL_PASSWORD,
  testVar: process.env.TEST_VAR,
  aqiApiKey: process.env.PURPLE_AIR_API_KEY,
  sensorIndex: process.env.SENSOR_INDEX | 0,
  maxTimeout: process.env.MAX_TIMEOUT | 0,
  minTimeout: process.env.MIN_TIMEOUT | 0,
  recoveryTimeout: process.env.RECOVERY_TIMEOUT | 0,
  aqiAlerts: process.env.AQI_ALERTS,
};
