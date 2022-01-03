const todos = require("../todos.json");
const {nanoid} = require("nanoid");

const todoRouteSchema = {
  getTodos: {
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string'},
              description: { type: 'string' }
            }
          }
        }
      }
    }
  },
  getTodo: {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string'},
            description: { type: 'string' }
          }
        }
      }
    }
  }
}

function todoRoutes(fastify, options, done) {
  fastify.get('/todos', todoRouteSchema.getTodos, (
    req,
    res
  ) => {
    res.send(todos.data)
  })

  fastify.get('/todos/:id', todoRouteSchema.getTodo, (
    req,
    res
  ) => {
    const { id } = req.params
    const todo = todos.data.find(todo => todo.id === id)

    try {
      todo
        ? res.send(todo)
        : res
          .status(404)
          .send('Todo not found')
    } catch (err) {
      console.error(err)
    }
  })

  fastify.post('/todos', (
    req,
    res
  ) => {
    try {
      todos.data.push({
        id: nanoid(),
        description: req.body,
      })
      res.send('Todo added')
    } catch (err) {
      console.error(err)
    }
  })

  fastify.delete('/todos/:id', (
    req,
    res
  ) => {
    const {id} = req.params
    const todo = todos.data.find(todo => todo.id === id)

    try {
      if (todo) {
        todos.data = todos.data.filter(todo => todo.id !== id)
        res.send(`"${todo.description}" deleted`)
      } else {
        res
          .status(404)
          .send('Todo not found')
      }
    } catch (err) {
      console.error(err)
    }
  })

  fastify.patch('/todos/:id', (
    req,
    res
  ) => {
    const {id} = req.params
    const description = req.body
    const index = todos.data.findIndex(todo => todo.id === id)
    const originalTodo = todos.data.find(todo => todo.id === id)

    try {
      if (originalTodo) {
        todos.data[index] = {
          id,
          description
        }
        res.send(`Todo "${originalTodo.description}" updated to "${description}"`)
      } else {
        res
          .status(404)
          .send('Todo not found')
      }
    } catch (err) {
      console.error(err)
    }
  })

  done()
}

module.exports = todoRoutes
