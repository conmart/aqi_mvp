const { emailPassword } = require('./config');
const nodemailer = require('nodemailer');

let defaultMailOptions = {
  from: 'conmartdev42@gmail.com',
  to: 'connor.a.martinelli@gmail.com',
  subject: 'Air Quality Update',
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'conmartdev42@gmail.com',
    pass: emailPassword,
  },
});

const sendEmail = (recovery, threshold) => {
  const text = recovery ? 'dropped below' : 'exceeded';
  const emailBody = `Attention: the AQI for your area has ${text} ${threshold}.`;
  const mailOptions = { ...defaultMailOptions, text: emailBody };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
  	  console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = { sendEmail };
