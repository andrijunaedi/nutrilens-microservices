module.exports = {
  createProduct: {
    body: {
      type: 'object',
      required: ['name', 'description', 'sugar_intake', 'salt_intake'],
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        sugar_intake: { type: 'number' },
        salt_intake: { type: 'number' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          description: { type: 'string' },
          sugar_intake: { type: 'number' },
          salt_intake: { type: 'number' },
        },
      },
    },
  },

  getProduct: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          description: { type: 'string' },
          sugar_intake: { type: 'number' },
          salt_intake: { type: 'number' },
        },
      },
    },
  },

  updateProduct: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
    },
    body: {
      type: 'object',
      required: ['name', 'description', 'sugar_intake', 'salt_intake'],
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        sugar_intake: { type: 'number' },
        salt_intake: { type: 'number' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          description: { type: 'string' },
          sugar_intake: { type: 'number' },
          salt_intake: { type: 'number' },
        },
      },
    },
  },

  deleteProduct: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'number' },
        },
      },
    },
  },

  getAllProducts: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            description: { type: 'string' },
            sugar_intake: { type: 'number' },
            salt_intake: { type: 'number' },
          },
        },
      },
    },
  },
};
