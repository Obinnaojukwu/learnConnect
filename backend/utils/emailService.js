const transporter = require('../config/emailConfig');

require('dotenv').config(); 

const sendWelcomeEmail = async (to, name) => {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to,
    subject: 'Welcome to Our Web App!',
    text: `Hello ${name},\n\nWelcome to our web app! We're excited to have you on board.\n\nBest regards,\nThe Team`,
    html: `<p>Hello ${name},</p><p>Welcome to our web app! We're excited to have you on board.</p><p>Best regards,<br>The Team</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully:', info.response);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

module.exports = sendWelcomeEmail;