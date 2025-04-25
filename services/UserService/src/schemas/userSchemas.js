module.exports = {
  createUser: {
    body: {
      type: 'object',
      required: ['name', 'email'],
      properties: {
        name: { type: 'string' },
        email: { type: 'string' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          email: { type: 'string' }
        }
      }
    }
  },

  getUser: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          email: { type: 'string' }
        }
      }
    }
  },

  updateUser: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' }
      }
    },
    body: {
      type: 'object',
      required: ['name', 'email'],
      properties: {
        name: { type: 'string' },
        email: { type: 'string' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          email: { type: 'string' }
        }
      }
    }
  },

  deleteUser: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'number' }
        }
      }
    }
  },

  getAllUsers: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            email: { type: 'string' }
          }
        }
      }
    }
  }
};