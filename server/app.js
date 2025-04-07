// backend/app.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const nodemailer = require('nodemailer');

console.log("GitHub API Token RETRIEVED" || "not found");


const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Proxy endpoint for fetching GitHub repositories
app.get('/api/github/repos', async (req, res) => {
  const repoUrl = 'https://api.github.com/users/ricosavvy/repos';
  const gitToken = process.env.GITHUB_API_TOKEN;

  try {
    const response = await fetch(repoUrl, {
      headers:{
        Authorization: `token ${gitToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repositories');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    res.status(500).json({ error: 'Failed to fetch GitHub repositories' });
  }
});

//email services
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});
app.post('/message', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
      from: email,
      to: process.env.GMAIL_USER,
      subject: `Contact Form Submission from ${name}`,
      text: `You have a new message from:
      
      Name: ${name}
      Email: ${email}
      Message: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          res.status(500).send({ success: false, message: 'Failed to send message' });
      } else {
          console.log('Email sent: ' + info.response);
          res.status(200).send({ success: true, message: 'Message sent successfully' });
      }
  });
});

// Routes

  
  app.post('/reviews/create', (req, res) => {
    const { email, comment, rating } = req.body;
    db.run(`INSERT INTO reviews (email, comment, rating) VALUES (?, ?, ?)`, [email, comment, rating], (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: 'Review created successfully' });
      }
    });
  });
  
  app.get('/reviews', (req, res) => {
    db.all(`SELECT * FROM reviews`, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows);
      }
    });
  });
  
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);})
;
