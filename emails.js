const { devEmail, emailPassword, personalEmail } = require('./config');
const nodemailer = require('nodemailer');

const aqiAlerts = [50, 100, 150];

let defaultMailOptions = {
  from: devEmail,
  to: personalEmail,
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: devEmail,
    pass: emailPassword,
  },
});

const sendEmail = (increasing, alert, aqi) => {
  const subject = `AQI Update: ${aqi}`;
  const dynamicText = increasing ? 'exceeded' : 'dropped below';
  const text = `The AQI for your area has ${dynamicText} your alert (${alert}) and is currently at ${aqi}.`;
  const mailOptions = { ...defaultMailOptions, text, subject };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

const triggerEmailSend = (aqi, lastReading) => {
  if (lastReading === null) {
    return;
  }
  for (let i = 0; i < aqiAlerts.length; i++) {
    const alert = aqiAlerts[i];
    if (aqi < alert && lastReading < alert) {
      break;
    } else if (aqi >= alert && lastReading >= alert) {
      continue;
    }
    const increasing = aqi > lastReading;
    sendEmail(increasing, alert, aqi);
    break;
  }
};

module.exports = { triggerEmailSend };
