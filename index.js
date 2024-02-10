const { calcTimeout } = require('./utils');
const { sendEmail } = require('./emails');
const { getSensorData } = require('./purple_air');

let exceededThreshold = false;
let threshold = 100;
let lastReading = null;
let currentTimout = null;

async function run() {
  aqi = await getSensorData();
  console.log(aqi, 'returned aqi');
  if (aqi > threshold && !exceededThreshold) {
    console.log('sending alert email')
    sendEmail(exceededThreshold, threshold, aqi);
    exceededThreshold = true;
  } else if (aqi < threshold && exceededThreshold) {
    console.log('sending recovery email')
    sendEmail(exceededThreshold, threshold, aqi);
    exceededThreshold = false;
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
  console.log(`Waiting ${Math.round(timeout / 60000)} minutes between checks. Current time ${new Date()}`)
  setTimeout(setSleepInt, timeout);
}

setSleepInt();
