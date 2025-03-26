const transporter = require('../config/emailConfig');
require('dotenv').config(); 
const path = require('path');

const sendWelcomeEmail = async (to, name) => {
  const mailOptions = {
    from: `"LearnConnect" <${process.env.EMAIL_USERNAME}>`,  
    to,
    subject: 'Welcome to LearnConnect – Your Learning Journey Begins!',
    
    html: `<div style="text-align: center;">
             <img src="cid:logo" alt="LearnConnect Logo" width="150" style="border-radius: 10px; margin-bottom: 15px;">
             <p>Hello ${name},</p>
             <p>Welcome to <strong>LearnConnect</strong>! We're excited to have you on board.</p>
             <p>Enjoy access to a rich library of educational and tutorial audios to enhance your learning experience.</p>
             <p>Start listening today and make the most of your learning journey!</p>
             <p>Best regards,<br><strong>The LearnConnect Team</strong></p>
           </div>`,
    
    attachments: [
      {
        filename: 'email.jpg',  
        path: path.join(__dirname, '../email.jpg'), // Adjusted path
        cid: 'logo'  // Reference ID for the image in email body
      }
    ]
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully:', info.response);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

module.exports = sendWelcomeEmail;
