const Koa = require('koa2')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')

const {request, deep_equal} = require('../commons')
const {set_authorization_middleware} = require('./authorization')
const {get_routing_model} = require('../routing_templates')

module.exports = function(model) {
  const app = new Koa()
  const {debug} = model

  function require_module_from_string(src, filename = '') {
    const Module = module.constructor
    const mod = new Module()
    mod._compile(src, filename)
    return mod.exports
  }

  const routs = require_module_from_string(get_routing_model(model))(Router, request, deep_equal)


  app.use(bodyParser())

  // if fake server model contains authorization property
  // next execution will set koa-bearer-token middleware
  set_authorization_middleware(app, model)
  app.use(cors())

  if(debug) {
    const logger = require('koa-logger')
    app.use(logger())
  }

  app.use(routs)

  return {
    app
  }
}
