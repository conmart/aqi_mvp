const aqiBreakPoints = [
  // [particulate breakpoint (pb) lower, bp upper, AQI lower, AQI upper]
  [0.0, 12.0, 0, 50],
  [12.1, 35.4, 51, 100],
  [35.5, 55.4, 101, 150],
  [55.5, 150.4, 151, 200],
  [150.5, 250.4, 201, 300],
  [250.5, 350.4, 301, 400],
  [350.5, 500, 401, 500],
];

const defaulTimeout = 600000;
const maxTimeout = 3600000;
const minTimeout = 300000;

const ppmToAqi = (ppm) => {
  if (ppm > aqiBreakPoints[aqiBreakPoints.length - 1][1]) {
    return 500;
  }
  let i = 0;
  while (ppm > aqiBreakPoints[i][1]) {
    i++;
  }
  let row = aqiBreakPoints[i];
  let raw = ((row[3] - row[2]) / (row[1] - row[0])) * (ppm - row[0]) + row[2];
  return Math.round(raw);
};

const calcTimeout = (aqi, lastReading, currentTimout) => {
  if (lastReading) {
    const diff = Math.abs(aqi - lastReading);
    if (diff > 10) {
      return Math.max((currentTimout / 2), minTimeout)
    } else if (diff < 5) {
      return Math.min((currentTimout * 2), maxTimeout)
    }
    return currentTimout
  }
  return defaulTimeout;
}

module.exports = { ppmToAqi, calcTimeout };
