const path = require('path')
const Koa = require('koa2')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const {set_authorization_middleware} = require('./authorization')
const {fs_write_sync} = require('../utils')
const {get_routing_model} = require('../routing_templates/json_routing_model')

module.exports = function(model) {

  fs_write_sync(path.resolve(__dirname, './routes.js'), get_routing_model(model))

  app.use(bodyParser())

  // if fake server model contains authorization property
  // next execution will set koa-bearer-token middleware
  set_authorization_middleware(app, model)
  app.use(cors())
  if(process.env.NODE_ENV = 'test') {
    const logger = require('koa-logger')
    app.use(logger())
  }

  app.use(require('./routes'))
  return app
}
