const axios = require('axios');

const getChatResponse = async (req, res) => {
  const question = req.body.question;
  
  console.log('Received question:', question);

  // Ensure the question is educational
  if (!isEducationalQuestion(question)) {
    console.log('Non-educational question received:', question);
    return res.status(400).json({ message: "Only educational questions are allowed." });
  }

  try {
    const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      contents: [{
        parts: [{ text: question }]
      }]
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const content = response.data.candidates[0]?.content?.parts?.[0]?.text?.trim();
    
    if (content) {
      console.log('Google AI Studio response content:', content);
      res.json(content);
    } else {
      console.error('Error: Unexpected response format from Google AI Studio API:', response.data);
      res.status(500).json({ message: "Error: Unexpected response format from Google AI Studio API", error: response.data });
    }
  } catch (error) {
    console.error('Error communicating with Google AI Studio API:', error.response ? error.response.data : error.message);
    if (error.response && error.response.data && error.response.data.error && error.response.data.error.code === 'insufficient_quota') {
      res.status(403).json({ message: "You have exceeded your quota for the Google AI Studio API. Please check your plan and billing details." });
    } else {
      res.status(500).json({ message: "Error communicating with Google AI Studio API", error: error.response ? error.response.data : error.message });
    }
  }
};

const isEducationalQuestion = (question) => {
  const educationalTopics = [
    /history/i,
    /math/i,
    /science/i,
    /geography/i,
    /literature/i,
    /president/i,
    /world war/i,
    /pythagorean/i,
    /photosynthesis/i,
    /motion/i,
    /continents/i,
    /capital/i,
    /author/i,
    /theme/i,
  ];
  const isEducational = educationalTopics.some(topic => topic.test(question));
  console.log('Is educational question:', isEducational);
  return isEducational;
};

module.exports = { getChatResponse };