const bearerToken = require('koa-bearer-token')

const authorization_map = {
  headers: 'headerKey',
  query: 'queryKey',
  bodyKey: 'bodyKey'
}

const authorization_defaults = {
  bodyKey: 'access_token',
  queryKey: 'access_token',
  headerKey: 'Bearer'
}

/**
 *
 * @param {function} initial_app
 * @param {object} param1
 * @returns {void}
 */

function set_authorization_middleware(initial_app, {authorization}) {
  if(!authorization) {return }

  // type is optional and default is headers authorization
  authorization.type = authorization.type || 'headers'
  // indicator is optional and default is headers authorization Bearer
  const indicator = authorization.indicator || authorization_defaults[authorization_map[authorization.type]]
  const authorization_model = {[authorization_map[authorization.type]]: indicator}
  initial_app.use(bearerToken(authorization_model))
}

module.exports = {
  set_authorization_middleware
}

