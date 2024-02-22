const aqiBreakPoints = [
  // [PM2.5 breakpoint (pb) lower, bp upper, AQI lower, AQI upper]
  [0.0, 12.0, 0, 50],
  [12.1, 35.4, 51, 100],
  [35.5, 55.4, 101, 150],
  [55.5, 150.4, 151, 200],
  [150.5, 250.4, 201, 300],
  [250.5, 350.4, 301, 400],
  [350.5, 500, 401, 500],
];

const maxTimeout = 3600000;
const minTimeout = 120000;

const pmToAqi = (pm) => {
  if (pm < 0) {
    return 0;
  }
  for (let i = 0; i < aqiBreakPoints.length; i++) {
    if (pm > aqiBreakPoints[i][1]) {
      continue;
    }
    const row = aqiBreakPoints[i];
    const raw =
      ((row[3] - row[2]) / (row[1] - row[0])) * (pm - row[0]) + row[2];
    return Math.round(raw);
  }
  return 500;
};

const calcTimeout = (aqi, lastReading, currentTimout) => {
  if (Number.isInteger(lastReading)) {
    const diff = Math.abs(aqi - lastReading);
    if (diff > 10) {
      return minTimeout;
    } else if (diff < 5) {
      return Math.min(currentTimout * 2, maxTimeout);
    }
    return currentTimout;
  }
  return minTimeout;
};

module.exports = { pmToAqi, calcTimeout };
