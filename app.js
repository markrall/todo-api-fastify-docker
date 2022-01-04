const app = require('fastify')({
  logger: true
})
const PORT = 3000
const HOST = '127.0.0.1' // '0.0.0.0'

app.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: 'docs',
  swagger: {
    info: {
      title: 'fastify-api'
    }
  }
})
app.register(require('./routes/todos'))

const start = async () => {
  try {
    await app.listen(PORT, HOST)
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

start()
