const { calcTimeout } = require('./utils');
const { sendEmail } = require('./emails');
const { getSensorData } = require('./purple_air');

let exceededThreshold = false;
let threshold = 100;
let lastReading = null;
let currentTimout = null;

async function run() {
  console.log('inside run');
  aqi = await getSensorData();
  console.log(aqi, 'returned aqi');
  if (aqi > threshold && !exceededThreshold) {
    exceededThreshold = true;
    console.log('sending alert email')
    sendEmail(false, threshold);
  } else if (aqi < threshold && exceededThreshold) {
    exceededThreshold = false;
    console.log('sending recovery email')
    sendEmail(true, threshold);
  } else {
    console.log('no action needed')
  }
  return aqi;
}

async function setSleepInt() {
  const aqi = await run();
  const timeout = calcTimeout(aqi, lastReading, currentTimout);
  lastReading = aqi;
  currentTimout = timeout;
  console.log(`Waiting ${Math.round(timeout / 60000)} minutes between checks`)
  setTimeout(setSleepInt, timeout);
}

setSleepInt();
