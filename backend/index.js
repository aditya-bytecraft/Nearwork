// backend/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Dummy data for workers
const workers = [
  { id: 1, name: "Raju", skill: "Plumber", location: "Nearby", price: 200 },
  { id: 2, name: "Pappu", skill: "Electrician", location: "Nearby", price: 250 },
  { id: 3, name: "Amit", skill: "Carpenter", location: "Nearby", price: 300 }
];

// Endpoint to get workers
app.get('/api/workers', (req, res) => {
  res.json(workers);
});

// Endpoint to post a job (just logs for now)
app.post('/api/jobs', (req, res) => {
  console.log('Job posted:', req.body);
  res.json({ message: "Job posted successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
