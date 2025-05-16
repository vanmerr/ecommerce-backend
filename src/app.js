const express = require('express');
const cors = require('cors');
const routes = require('./routes/index.route');
const setupSwagger = require('./configs/swagger.config'); // Import Swagger setup
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Setup Swagger
setupSwagger(app);

// Routes
app.use('/api', routes);

module.exports = app;