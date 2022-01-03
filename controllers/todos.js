const { nanoid } = require("nanoid");
const todos = require("../todos.json");

const todoControllers = {
  getTodos: function (req, res) {
    res.send(todos.data)
  },
  getTodo: function (req, res) {
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
  },
  postTodo: function (req, res) {
    const id = nanoid()
    const { description, dueDate, completed } = req.body
    const todo = {
      id,
      description,
      dueDate,
      completed
    }
    try {
      todos.data.push(todo)
      res.send(todo)
    } catch (err) {
      console.error(err)
    }
  },
  deleteTodo: function (req, res) {
    const {id} = req.params
    const todo = todos.data.find(todo => todo.id === id)

    try {
      if (todo) {
        todos.data = todos.data.filter(todo => todo.id !== id)
        res.send(todo)
      } else {
        res
          .status(404)
          .send('Todo not found')
      }
    } catch (err) {
      console.error(err)
    }
  },
  updateTodo: function (req, res) {
    const {id} = req.params
    const { description, dueDate, completed } = req.body
    const index = todos.data.findIndex(todo => todo.id === id)
    const originalTodo = todos.data.find(todo => todo.id === id)

    try {
      if (originalTodo) {
        todos.data[index] = {
          ...originalTodo,
          description: description ?? originalTodo.description,
          dueDate: dueDate ?? originalTodo.dueDate,
          completed: completed ?? originalTodo.completed
        }
        res.send(todos.data[index])
      } else {
        res
          .status(404)
          .send('Todo not found')
      }
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = todoControllers
