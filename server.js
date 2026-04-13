'use strict';
const express = require('express');
const axios   = require('axios');
const path    = require('path');

const app       = express();
const PORT      = 3000;
const FLASK_URL = process.env.FLASK_URL || 'http://localhost:5000';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ── Home Page ─────────────────────────────────────────────────────────
app.get('/', async (req, res) => {
  try {
    const { data } = await axios.get(`${FLASK_URL}/api/students`);
    res.render('index', {
      students : data.data,
      count    : data.count,
      flask_url: FLASK_URL
    });
  } catch (err) {
    res.render('index', { students: [], count: 0, flask_url: FLASK_URL });
  }
});

// ── Add Student ───────────────────────────────────────────────────────
app.post('/add-student', async (req, res) => {
  try {
    await axios.post(`${FLASK_URL}/api/students`, req.body);
    res.redirect('/');
  } catch (err) {
    res.redirect('/');
  }
});

// ── Delete Student ────────────────────────────────────────────────────
app.post('/delete-student/:id', async (req, res) => {
  try {
    await axios.delete(`${FLASK_URL}/api/students/${req.params.id}`);
    res.redirect('/');
  } catch (err) {
    res.redirect('/');
  }
});

// ── Health Check ──────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ healthy: true, service: 'express' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Express running on port ${PORT}`);
  console.log(`Flask URL: ${FLASK_URL}`);
});
