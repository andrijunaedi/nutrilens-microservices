const productController = require('../controllers/productController');
const productSchemas = require('../schemas/productSchemas');

async function productRoutes(fastify, options) {
  fastify.post(
    '/products',
    { schema: productSchemas.createProduct },
    productController.createProduct
  );
  fastify.get('/products/:id', { schema: productSchemas.getProduct }, productController.getProduct);
  fastify.put(
    '/products/:id',
    { schema: productSchemas.updateProduct },
    productController.updateProduct
  );
  fastify.delete(
    '/products/:id',
    { schema: productSchemas.deleteProduct },
    productController.deleteProduct
  );
  fastify.get(
    '/products',
    { schema: productSchemas.getAllProducts },
    productController.getAllProducts
  );
}

module.exports = productRoutes;
