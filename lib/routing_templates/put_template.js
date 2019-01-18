const {
  build_response_default,
  build_request_params_response,
  build_request_authorization_response,
  build_request_queries_response,
  build_request_from_other_server_response
} = require('./build_koa_router_model')
/**
  * @param {object} put_api_object
  * @param {object} put_api_object.path
  * @param {object} put_api_object.response
  * @param {number|undefined} put_api_object.status
  * @param {object|undefined} put_api_object.params_response
  * @param {object|undefined} put_api_object.authorization
  * @returns {string}
*/
function put_template({path, response = {ok: 'OK'}, status = 200, params_response, authorization, response_from_url}) {
  let internal_body_part = ''
  if(authorization) {
    internal_body_part += build_request_authorization_response(authorization, path, 'PUT')
  }

  if(response_from_url) {
    internal_body_part += build_request_from_other_server_response(response_from_url, path, 'PUT')
  }

  if(params_response) {
    internal_body_part += build_request_params_response(params_response, path, 'PUT')
  }

  internal_body_part += build_request_queries_response(response, path, 'PUT')

  response = build_response_default(response, path, 'PUT')
  return `
    router.put('${path}', async (ctx) => {
      ctx.status = ${status}
      ${internal_body_part}
      ctx.body = ${response}
      return ctx
    })`
}

module.exports = {
  put_template
}
