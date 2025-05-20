// Simple Express server to handle MailerLite API integration and serve static files
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname)));

// For SPA routing - serve index.html for any non-API routes that don't match static files
app.get('*', (req, res, next) => {
  // Skip API routes
  if (req.path.startsWith('/api/')) {
    return next();
  }
  
  // Skip if the file exists
  const filePath = path.join(__dirname, req.path);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return next();
  }
  
  // Otherwise serve index.html
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint to handle waitlist signups
app.post('/api/waitlist', async (req, res) => {
  try {
    const { email, childAge } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    // Get API key from environment variables
    const apiKey = process.env.WAITLIST_MAILERLITE_API_KEY || process.env.MAILERLITE_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }
    
    // Create subscriber data for MailerLite
    const subscriberData = {
      email: email,
      fields: {}
    };
    
    // Add child age as a custom field if provided
    if (childAge) {
      subscriberData.fields.child_age = childAge;
    }
    
    // Send data to MailerLite API
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(subscriberData)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return res.status(200).json({ success: true, message: 'Successfully joined waitlist' });
    } else {
      console.error('MailerLite API error:', data);
      return res.status(response.status).json({ 
        error: data.message || 'Failed to join waitlist',
        details: data
      });
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
