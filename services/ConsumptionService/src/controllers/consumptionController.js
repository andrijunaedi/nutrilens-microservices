const consumptionModel = require('../models/consumptionModel');
const axios = require('axios');

module.exports = {
  async createConsumption(request, reply) {
    const { user_id, product_id, date, quantity } = request.body;

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
      const result = await consumptionModel.createConsumption(user_id, product_id, date, quantity);
      reply.send(result);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        reply.code(404).send({ error: error.response.data.error });
      } else {
        console.error('Error creating consumption:', error);
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

    try {
      // Fetch user details from UserService
      const userResponse = await axios.get(`http://localhost:8000/users/${result.user_id}`);
      const user = userResponse.data;

      // Fetch product details from ProductService
      const productResponse = await axios.get(
        `http://localhost:8001/products/${result.product_id}`
      );
      const product = productResponse.data;

      // Calculate sugar and salt intake
      const sugar_intake = product.sugar_intake * result.quantity;
      const salt_intake = product.salt_intake * result.quantity;

      // Include user, product, and calculated details in the response
      reply.send({
        ...result,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          age: user.age,
          gender: user.gender,
        },
        product: {
          id: product.id,
          name: product.name,
          description: product.description,
          sugar_intake: product.sugar_intake,
          salt_intake: product.salt_intake,
        },
        sugar_intake,
        salt_intake,
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        reply.code(404).send({ error: error.response.data.error });
      } else {
        reply.code(500).send({ error: 'Internal Server Error' });
      }
    }
  },

  async updateConsumption(request, reply) {
    const { id } = request.params;
    const { user_id, product_id, date, quantity } = request.body;
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
    const { user_id, product_id } = request.query;
    let result;
    if (user_id) {
      result = await consumptionModel.getConsumptionsByUserId(user_id);
    } else if (product_id) {
      result = await consumptionModel.getConsumptionsByProductId(product_id);
    } else {
      result = await consumptionModel.getAllConsumptions();
    }

    try {
      const enrichedResults = await Promise.all(
        result.map(async (record) => {
          const userResponse = await axios.get(`http://localhost:8000/users/${record.user_id}`);
          const user = userResponse.data;

          const productResponse = await axios.get(
            `http://localhost:8001/products/${record.product_id}`
          );
          const product = productResponse.data;

          return {
            ...record,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
            product: {
              id: product.id,
              name: product.name,
              description: product.description,
              sugar_intake: product.sugar_intake,
              salt_intake: product.salt_intake,
            },
            sugar_intake: product.sugar_intake * record.quantity,
            salt_intake: product.salt_intake * record.quantity,
          };
        })
      );

      reply.send(enrichedResults);
    } catch (error) {
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  },
};
