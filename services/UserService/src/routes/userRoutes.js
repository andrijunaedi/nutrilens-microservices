const userController = require('../controllers/userController');
const userSchemas = require('../schemas/userSchemas');

async function userRoutes(fastify, options) {
  fastify.post('/users', { schema: userSchemas.createUser }, userController.createUser);
  fastify.get('/users/:id', { schema: userSchemas.getUser }, userController.getUser);
  fastify.put('/users/:id', { schema: userSchemas.updateUser }, userController.updateUser);
  fastify.delete('/users/:id', { schema: userSchemas.deleteUser }, userController.deleteUser);
  fastify.get('/users', { schema: userSchemas.getAllUsers }, userController.getAllUsers);
  fastify.get(
    '/users/:id/consumptions',
    { schema: userSchemas.getUserConsumptions },
    userController.getUserConsumptions
  );
}

module.exports = userRoutes;
