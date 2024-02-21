const { calcTimeout } = require('./utils');
const { triggerEmailSend } = require('./emails');
const { getSensorData } = require('./purple_air');
const express = require('express');
const app = express();

let currentTimout = null;
let lastReading = null;

async function run() {
  aqi = await getSensorData();
  console.log(aqi, 'returned aqi');
  triggerEmailSend(aqi, lastReading);
  return aqi;
}

async function setSleepInt() {
  const aqi = await run();
  const timeout = calcTimeout(aqi, lastReading, currentTimout);
  lastReading = aqi;
  currentTimout = timeout;
  console.log(
    `Waiting ${Math.round(
      timeout / 60000
    )} minutes between checks. Current time ${new Date()}`
  );
  setTimeout(setSleepInt, timeout);
}

setSleepInt();

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`aqiapp: listening on port ${port}`);
});
