// const express = require('express');
// const cors = require('cors');
// const app = express();

// app.use(cors());

// app.get('/api/home', (req, res) => {
//   const data = require('./data/homepageData.json');
//   res.json(data);
// });

// app.listen(5000, () => {
//   console.log('Server running on http://localhost:5000');
// });


// 📍 File: src/backend/server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());

// ✅ Original route
app.get('/api/home', (req, res) => {
  const data = require('./data/homepageData.json');
  res.json(data);
});

// ✅ New route for categories
app.get('/api/categories', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'categories.json');

  try {
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const categories = JSON.parse(jsonData);
    res.json(categories);
  } catch (err) {
    console.error('Failed to load categories.json:', err);
    res.status(500).json({ error: 'Failed to load categories' });
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
