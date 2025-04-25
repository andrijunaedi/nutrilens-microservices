const userModel = require('../models/userModel');
const axios = require('axios');

module.exports = {
  async createUser(request, reply) {
    const { name, email } = request.body;
    const result = await userModel.createUser(name, email);
    reply.send(result);
  },

  async getUser(request, reply) {
    const { id } = request.params;
    const result = await userModel.getUserById(id);
    if (!result) {
      reply.code(404).send({ error: 'User not found' });
      return;
    }
    reply.send(result);
  },

  async updateUser(request, reply) {
    const { id } = request.params;
    const { name, email } = request.body;
    const existingUser = await userModel.getUserById(id);
    if (!existingUser) {
      reply.code(404).send({ error: 'User not found' });
      return;
    }
    const result = await userModel.updateUser(id, name, email);
    reply.send(result);
  },

  async deleteUser(request, reply) {
    const { id } = request.params;
    const existingUser = await userModel.getUserById(id);
    if (!existingUser) {
      reply.code(404).send({ error: 'User not found' });
      return;
    }
    const result = await userModel.deleteUser(id);
    reply.send(result);
  },

  async getAllUsers(request, reply) {
    const result = await userModel.getAllUsers();
    reply.send(result);
  },

  async getUserConsumptions(request, reply) {
    const { id } = request.params;

    try {
      const response = await axios.get(`http://localhost:8002/consumptions?user_id=${id}`);
      reply.send(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        reply.code(404).send({ error: 'Consumptions not found for the user' });
      } else {
        reply.code(500).send({ error: 'Internal Server Error' });
      }
    }
  },
};
