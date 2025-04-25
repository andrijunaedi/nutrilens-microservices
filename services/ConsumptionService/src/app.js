const fastify = require('fastify')({ logger: true });
const consumptionRoutes = require('./routes/consumptionRoutes');
const path = require('path');
const fastifySwagger = require('@fastify/swagger');
const fastifySwaggerUi = require('@fastify/swagger-ui');

// Register Swagger
fastify.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'ConsumptionService API',
      description: 'API documentation for ConsumptionService',
      version: '1.0.0',
    },
    host: 'localhost:8002',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
});

fastify.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'ConsumptionService API',
      description: 'API documentation for ConsumptionService',
      version: '1.0.0',
    },
  },
  exposeRoute: true,
});

// Register routes
fastify.register(consumptionRoutes);

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 8002 });
    fastify.log.info(`Server running at http://localhost:8002`);
    fastify.log.info(`API docs available at http://localhost:8002/docs`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
