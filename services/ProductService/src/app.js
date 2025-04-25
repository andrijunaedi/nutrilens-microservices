const fastify = require('fastify')({ logger: true });
const productRoutes = require('./routes/productRoutes');
const fastifySwagger = require('@fastify/swagger');
const fastifySwaggerUi = require('@fastify/swagger-ui');

// Register Swagger
fastify.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'ProductService API',
      description: 'API documentation for ProductService',
      version: '1.0.0',
    },
    host: 'localhost:8001',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
});

fastify.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'ProductService API',
      description: 'API documentation for ProductService',
      version: '1.0.0',
    },
  },
  exposeRoute: true,
});

// Register routes
fastify.register(productRoutes);

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 8001 });
    fastify.log.info(`Server running at http://localhost:8001`);
    fastify.log.info(`API docs available at http://localhost:8001/docs`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
