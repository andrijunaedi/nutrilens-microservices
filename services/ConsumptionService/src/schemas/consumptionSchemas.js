module.exports = {
  createConsumption: {
    body: {
      type: 'object',
      required: ['user_id', 'product_id', 'date', 'quantity'],
      properties: {
        user_id: { type: 'number' },
        product_id: { type: 'number' },
        date: { type: 'string', format: 'date' },
        quantity: { type: 'number' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          user_id: { type: 'number' },
          product_id: { type: 'number' },
          date: { type: 'string' },
          quantity: { type: 'number' },
        },
      },
    },
  },

  getConsumption: {
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
          user_id: { type: 'number' },
          product_id: { type: 'number' },
          date: { type: 'string' },
          quantity: { type: 'number' },
          sugar_intake: { type: 'number' },
          salt_intake: { type: 'number' },
          user: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              email: { type: 'string' },
              age: { type: 'number' },
              gender: { type: 'string' },
            },
          },
          product: {
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
  },

  updateConsumption: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
    },
    body: {
      type: 'object',
      required: ['user_id', 'product_id', 'date', 'quantity'],
      properties: {
        user_id: { type: 'number' },
        product_id: { type: 'number' },
        date: { type: 'string', format: 'date' },
        quantity: { type: 'number' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          user_id: { type: 'number' },
          product_id: { type: 'number' },
          date: { type: 'string' },
          quantity: { type: 'number' },
        },
      },
    },
  },

  deleteConsumption: {
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

  getAllConsumptions: {
    description: 'Retrieve all consumption records, optionally filtered by user_id or product_id.',
    querystring: {
      type: 'object',
      properties: {
        user_id: { type: 'integer', description: 'Filter by user ID' },
        product_id: { type: 'integer', description: 'Filter by product ID' },
      },
      additionalProperties: false,
    },
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            user_id: { type: 'integer' },
            product_id: { type: 'integer' },
            date: { type: 'string' },
            quantity: { type: 'number' },
            sugar_intake: { type: 'number' },
            salt_intake: { type: 'number' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                email: { type: 'string' },
                age: { type: 'number' },
                gender: { type: 'string' },
              },
            },
            product: {
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
    },
  },
};
