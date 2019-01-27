const {build_response_default} = require('./body_default')

/**
 *
 * @param {object} authorization
 * @param {string} path
 * @param {string} http_method
 */
function build_request_authorization_response(authorization, path, http_method) {

  const {unauthorized = {unauthorized: 'unauthorized'}, status = 401, token} = authorization

  return `\n
    const token = ctx.request.token
    if(token !== '${token}') {
      ctx.status = ${status}
      ctx.body = ${build_response_default(unauthorized, path, http_method)}
      return ctx
    }
  \n`
}

module.exports = {
  build_request_authorization_response
}