const app = require('fastify')({ logger: true })
const fastifyEnv = require('fastify-env')

const schema = {
  type: 'object',
  required: [ 'PORT', 'HOST' ],
  properties: {
    PORT: {
      type: 'string',
      default: 3000
    },
    HOST: {
      type: 'string',
      default: 'localhost'
    }
  }
}
const options = {
  dotenv: true,
  schema
}

app.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'todo-api',
      description: 'Todo API documentation, testing and examples',
    }
  }
})

app.register(require('./routes/todos'))

const start = async ({PORT, HOST}) => {
  try {
    await app.listen(PORT, HOST)
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

app.register(fastifyEnv, options)
  .ready((err) => {
    if (err) console.error(err)

    start(app.config)
    console.log(app.config) // or fastify[options.confKey]
    // output: { PORT: 3000 }
  })

