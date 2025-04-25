module.exports = {
  createConsumption: {
    body: {
      type: 'object',
      required: [
        'user_id',
        'product_id',
        'date',
        'quantity',
        'sugar_total_intake',
        'salt_total_intake',
      ],
      properties: {
        user_id: { type: 'number' },
        product_id: { type: 'number' },
        date: { type: 'string', format: 'date' },
        quantity: { type: 'number' },
        sugar_total_intake: { type: 'number' },
        salt_total_intake: { type: 'number' },
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
          sugar_total_intake: { type: 'number' },
          salt_total_intake: { type: 'number' },
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
          sugar_total_intake: { type: 'number' },
          salt_total_intake: { type: 'number' },
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
      required: [
        'user_id',
        'product_id',
        'date',
        'quantity',
        'sugar_total_intake',
        'salt_total_intake',
      ],
      properties: {
        user_id: { type: 'number' },
        product_id: { type: 'number' },
        date: { type: 'string', format: 'date' },
        quantity: { type: 'number' },
        sugar_total_intake: { type: 'number' },
        salt_total_intake: { type: 'number' },
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
          sugar_total_intake: { type: 'number' },
          salt_total_intake: { type: 'number' },
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
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            user_id: { type: 'number' },
            product_id: { type: 'number' },
            date: { type: 'string' },
            quantity: { type: 'number' },
            sugar_total_intake: { type: 'number' },
            salt_total_intake: { type: 'number' },
          },
        },
      },
    },
  },
};
