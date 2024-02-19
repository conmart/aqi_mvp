const { calcTimeout } = require('./utils');
const { triggerEmailSend } = require('./emails');
const { getSensorData } = require('./purple_air');

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
