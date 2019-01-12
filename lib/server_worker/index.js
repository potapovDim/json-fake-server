const path = require('path')
const Koa = require('koa2')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const {set_authorization_middleware} = require('./authorization')
const {fs_write_sync, get_random_file_name, fs_unlink_sync} = require('../utils')
const {get_routing_model} = require('../routing_templates/json_routing_model')

module.exports = function(model) {
  const app = new Koa()
  const {debug} = model
  const file_path = path.resolve(__dirname, get_random_file_name())
  fs_write_sync(file_path, get_routing_model(model))

  app.use(bodyParser())

  // if fake server model contains authorization property
  // next execution will set koa-bearer-token middleware
  set_authorization_middleware(app, model)
  app.use(cors())

  if(debug) {
    const logger = require('koa-logger')
    app.use(logger())
  }

  app.use(require(file_path))

  return {
    app,
    clear: () => fs_unlink_sync(file_path)
  }
}
