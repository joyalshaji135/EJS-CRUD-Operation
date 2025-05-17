require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const concertRoutes = require('./routes/concertRoutes');
const path = require('path');

const app = express();

// Database connection
require('./config/db');
const connectDB = require('./config/db');
connectDB();

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(ejsLayouts);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');

// Routes
app.use('/concerts', concertRoutes);

// Home route
app.get('/', (req, res) => {
    res.redirect('/concerts');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});