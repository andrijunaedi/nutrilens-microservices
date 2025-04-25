const productModel = require('../models/productModel');

module.exports = {
  async createProduct(request, reply) {
    const { name, description, sugar_intake, salt_intake } = request.body;
    const result = await productModel.createProduct(name, description, sugar_intake, salt_intake);
    reply.send(result);
  },

  async getProduct(request, reply) {
    const { id } = request.params;
    const result = await productModel.getProductById(id);
    if (!result) {
      reply.code(404).send({ error: 'Product not found' });
      return;
    }
    reply.send(result);
  },

  async updateProduct(request, reply) {
    const { id } = request.params;
    const { name, description, sugar_intake, salt_intake } = request.body;
    const existingProduct = await productModel.getProductById(id);
    if (!existingProduct) {
      reply.code(404).send({ error: 'Product not found' });
      return;
    }
    const result = await productModel.updateProduct(
      id,
      name,
      description,
      sugar_intake,
      salt_intake
    );
    reply.send(result);
  },

  async deleteProduct(request, reply) {
    const { id } = request.params;
    const existingProduct = await productModel.getProductById(id);
    if (!existingProduct) {
      reply.code(404).send({ error: 'Product not found' });
      return;
    }
    const result = await productModel.deleteProduct(id);
    reply.send(result);
  },

  async getAllProducts(request, reply) {
    const result = await productModel.getAllProducts();
    reply.send(result);
  },
};
