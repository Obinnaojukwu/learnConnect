const axios = require('axios');

const validateEmail = async (email) => {
  const apiKey = process.env.ZEROBOUNCE_API_KEY;
  const url = `https://api.zerobounce.net/v2/validate?api_key=${apiKey}&email=${email}`;

  try {
    const response = await axios.get(url);
    const { status, sub_status } = response.data;

    console.log('ZeroBounce response:', response.data); // Log the response for debugging

    if (status === 'valid') {
      return true;
    } else if (status === 'invalid' || sub_status === 'spamtrap') {
      return false;
    } else {
      return false; // other statuses can be handled as needed
    }
  } catch (error) {
    console.error('Error validating email:', error);
    return false; // Return false if there is an error with the validation service
  }
};

module.exports = validateEmail;