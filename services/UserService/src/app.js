const fastify = require('fastify')({ logger: true });
const userRoutes = require('./routes/userRoutes');
const fastifySwagger = require('@fastify/swagger');
const fastifySwaggerUi = require('@fastify/swagger-ui');

// Register Swagger
fastify.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'UserService API',
      description: 'API documentation for UserService',
      version: '1.0.0'
    },
    host: 'localhost:8000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  }
});

fastify.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'UserService API',
      description: 'API documentation for UserService',
      version: '1.0.0'
    }
  },
  exposeRoute: true
});

// Register routes
fastify.register(userRoutes);

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 8000 });
    fastify.log.info(`Server running at http://localhost:8000`);
    fastify.log.info(`API docs available at http://localhost:8000/docs`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
