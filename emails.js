const { devEmail, emailPassword, personalEmail } = require('./config');
const nodemailer = require('nodemailer');

let defaultMailOptions = {
  from: devEmail,
  to: personalEmail,
  subject: 'Air Quality Update',
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: devEmail,
    pass: emailPassword,
  },
});

const sendEmail = (exceededThreshold, threshold, aqi) => {
  const subject = `AQI Update: ${aqi}`;
  const dynamicText = exceededThreshold ? 'dropped below' : 'exceeded';
  const text = `Attention: the AQI for your area has ${dynamicText} your alert (${threshold}) and is currently at ${aqi}.`;
  const mailOptions = { ...defaultMailOptions, text, subject };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
  	  console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = { sendEmail };
