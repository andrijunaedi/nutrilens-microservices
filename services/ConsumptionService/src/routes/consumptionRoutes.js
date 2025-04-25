const consumptionController = require('../controllers/consumptionController');
const consumptionSchemas = require('../schemas/consumptionSchemas');

async function consumptionRoutes(fastify, options) {
  fastify.post(
    '/consumptions',
    { schema: consumptionSchemas.createConsumption },
    consumptionController.createConsumption
  );
  fastify.get(
    '/consumptions/:id',
    { schema: consumptionSchemas.getConsumption },
    consumptionController.getConsumption
  );
  fastify.put(
    '/consumptions/:id',
    { schema: consumptionSchemas.updateConsumption },
    consumptionController.updateConsumption
  );
  fastify.delete(
    '/consumptions/:id',
    { schema: consumptionSchemas.deleteConsumption },
    consumptionController.deleteConsumption
  );
  fastify.get(
    '/consumptions',
    { schema: consumptionSchemas.getAllConsumptions },
    consumptionController.getAllConsumptions
  );
}

module.exports = consumptionRoutes;
