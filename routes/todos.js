const todoRouteSchemas = require('./todoSchema')

function todoRoutes(fastify, options, done) {
  fastify.get('/todos', todoRouteSchemas.getTodos)
  fastify.get('/todos/:id', todoRouteSchemas.getTodo)
  fastify.post('/todos', todoRouteSchemas.postTodo)
  fastify.delete('/todos/:id', todoRouteSchemas.deleteTodo)
  fastify.patch('/todos/:id', todoRouteSchemas.patchTodo)
  done()
}

module.exports = todoRoutes
