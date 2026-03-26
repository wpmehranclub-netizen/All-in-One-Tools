const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');

// Register CORS
fastify.register(cors, {
  origin: '*',
});

// Import routes
const rootRoutes = require('./routes/index');

// Register routes
fastify.register(rootRoutes);

module.exports = fastify;
