require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;

// Minimal CORS and security-related headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// new endpoint with async/await and external API call
app.get('/me', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store'); // ensure fresh data each request

  try {
    // --- Dynamic Cat Fact ---
    const catFactResponse = await axios.get('https://catfact.ninja/fact', { timeout: 5000 });
    const catFact = catFactResponse.data.fact;

    // --- Dynamic Timestamp ---
    const timestamp = new Date().toISOString();

    // --- Your Static Info ---
    const userProfile = {
      email: process.env.MY_EMAIL,
      name: process.env.MY_NAME,
      stack: process.env.MY_STACK
    };

    // --- Final Response ---
    const responseData = {
      status: 'success',
      user: userProfile,
      timestamp: timestamp,
      fact: catFact
    };

    res.status(200).json(responseData);
  } catch (error) {
    // --- Graceful Error Handling ---
    console.error("Error fetching cat fact:", error.message);

    const userProfile = {
      email: process.env.MY_EMAIL,
      name: process.env.MY_NAME,
      stack: process.env.MY_STACK
    };

    const errorResponse = {
      status: 'success',
      user: userProfile,
      timestamp: new Date().toISOString(),
      fact: "Could not fetch a cat fact at this time, but I'm purr-sistent!"
    };

    res.status(200).json(errorResponse);
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});