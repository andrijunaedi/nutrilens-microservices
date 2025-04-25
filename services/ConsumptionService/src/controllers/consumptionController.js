const consumptionModel = require('../models/consumptionModel');
const axios = require('axios');

module.exports = {
  async createConsumption(request, reply) {
    const { user_id, product_id, date, quantity, sugar_total_intake, salt_total_intake } =
      request.body;

    try {
      // Check if user exists in UserService
      const userResponse = await axios.get(`http://localhost:8000/users/${user_id}`);
      if (!userResponse.data) {
        reply.code(404).send({ error: 'User not found' });
        return;
      }

      // Check if product exists in ProductService
      const productResponse = await axios.get(`http://localhost:8001/products/${product_id}`);
      if (!productResponse.data) {
        reply.code(404).send({ error: 'Product not found' });
        return;
      }

      // Create consumption record
      const result = await consumptionModel.createConsumption(
        user_id,
        product_id,
        date,
        quantity,
        sugar_total_intake,
        salt_total_intake
      );
      reply.send(result);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        reply.code(404).send({ error: error.response.data.error });
      } else {
        reply.code(500).send({ error: 'Internal Server Error' });
      }
    }
  },

  async getConsumption(request, reply) {
    const { id } = request.params;
    const result = await consumptionModel.getConsumptionById(id);
    if (!result) {
      reply.code(404).send({ error: 'Consumption record not found' });
      return;
    }
    reply.send(result);
  },

  async updateConsumption(request, reply) {
    const { id } = request.params;
    const { user_id, product_id, date, quantity, sugar_total_intake, salt_total_intake } =
      request.body;
    const existingRecord = await consumptionModel.getConsumptionById(id);
    if (!existingRecord) {
      reply.code(404).send({ error: 'Consumption record not found' });
      return;
    }
    const result = await consumptionModel.updateConsumption(
      id,
      user_id,
      product_id,
      date,
      quantity,
      sugar_total_intake,
      salt_total_intake
    );
    reply.send(result);
  },

  async deleteConsumption(request, reply) {
    const { id } = request.params;
    const existingRecord = await consumptionModel.getConsumptionById(id);
    if (!existingRecord) {
      reply.code(404).send({ error: 'Consumption record not found' });
      return;
    }
    const result = await consumptionModel.deleteConsumption(id);
    reply.send(result);
  },

  async getAllConsumptions(request, reply) {
    const result = await consumptionModel.getAllConsumptions();
    reply.send(result);
  },
};
