const routing_templates = require('./routing_templates')
const {get_koa_method} = require('./koa_mapping')


/**
 * @param {string}  jsom_model_path path to JSON file with fake model
 * @returns {object} return requires from JSON file
 */
function get_JSON_model(jsom_model_path) {
  const JSON_model = require(jsom_model_path)
  return JSON_model
}

/**
 * @param {string}  jsom_model_path path to JSON file with fake model
 * @returns {string} return string with KOA routing model
 */
function get_routing_model(jsom_model_path) {
  const top_base =
    'const router = require("koa-router")() \n' +
    'const fs = require("fs") \n' +
    'const path = require("path") \n'

  const bottom_base = '\n module.exports = router.routes() \n'

  const {api} = get_JSON_model(jsom_model_path)

  const routing_model = api.reduce((current_model, {method, ...rest}) => {

    const koa_method = get_koa_method(method)

    const koa_rout_executor = routing_templates[koa_method](rest)

    current_model += '\n' + koa_rout_executor

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
