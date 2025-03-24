const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendResetCodeEmail = (email, resetCode) => {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Password Reset Code',
    text: `Your password reset code is: ${resetCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending reset code email:', error);
    } else {
      console.log('Reset code email sent:', info.response);
    }
  });
};

module.exports = sendResetCodeEmail;