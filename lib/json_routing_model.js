const fs = require('fs')
const routing_templates = require('./routing_templates')
const {get_koa_method} = require('./koa_mapping')

// temporary solution
function get_JSON_model() {
  const JSON_model = require('../examples/test.example.json')
  return JSON_model
}

function get_routing_model() {
  const top_base = 'const router = require("koa-router")() \n'
  const bottom_base = '\n module.exports = router.routes() \n'

  const {api} = get_JSON_model()
  // {
  //   "method": "POST",
  //   "path": "/example",
  //   "response": {
  //     "example": "example"
  //   }
  // }
  const routing_model = api.reduce((current_model, {method, ...rest}) => {
    const koa_method = get_koa_method(method)
    const koa_rout_executor = routing_templates[koa_method](rest)
    current_model += '\n\n' + koa_rout_executor
    return current_model
  }, '')

  const full_model =
    top_base +
    routing_model +
    bottom_base

  return full_model
}

module.exports = {
  get_routing_model
}