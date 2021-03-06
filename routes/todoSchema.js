const todoControllers = require('../controllers/todos')

const todoRouteSchemas = {
  getTodos: {
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string'},
              description: { type: 'string' },
              dueDate: { type: 'integer' },
              completed: { type: 'boolean' },
              created: { type: 'integer' },
            }
          }
        }
      }
    },
    handler: todoControllers.getTodos
  },
  getTodo: {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object', // [ 'object', 'string' ],
          properties: {
            id: { type: 'string'},
            description: { type: 'string' },
            dueDate: { type: 'integer' },
            completed: { type: 'boolean' },
            created: { type: 'integer' }
          }
        }
      }
    },
    handler: todoControllers.getTodo
  },
  postTodo: {
    schema: {
      body: {
        type: 'object',
        properties: {
          description: { type: 'string' },
          dueDate: { type: 'integer' },
          completed: { type: 'boolean' },
          created: { type: 'integer' }
        },
        required: [ 'description' ],
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'string'},
            description: { type: 'string' },
            dueDate: { type: 'integer' },
            completed: { type: 'boolean' },
            created: { type: 'integer' }
          }
        }
      }
    },
    handler: todoControllers.postTodo
  },
  deleteTodo: {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string'},
            description: { type: 'string' },
            dueDate: { type: 'integer' },
            completed: { type: 'boolean' },
            created: { type: 'integer' }
          }
        }
      }
    },
    handler: todoControllers.deleteTodo
  },
  patchTodo: {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      body: {
        type: 'object',
        properties: {
          description: { type: 'string' },
          dueDate: { type: 'integer' },
          completed: { type: 'boolean' },
          updated: { type: 'integer' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string'},
            description: { type: 'string' },
            dueDate: { type: 'integer' },
            completed: { type: 'boolean' },
            created: { type: 'integer' }
          }
        }
      }
    },
    handler: todoControllers.updateTodo
  },
}

module.exports = todoRouteSchemas
