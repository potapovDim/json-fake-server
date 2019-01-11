const {
  build_response_default,
  build_request_params_response,
  build_request_authorization_response
} = require('./build_koa_router_model')


/**
 * HTTP METHOD OBJEC WHAT CONTAINS ALL INFORMATION ABOUT ROUTING EXECUTION
 * @param {Object} HTTP_api_object - The employee who is responsible for the project.
 * @param {string} HTTP_api_object.path - url endpoint path '/example'
 * @param {any} HTTP_api_object.response - response whar will be used as response after endpoint call
 */

function delete_template({path, response, status = 200, params_response, authorization}) {
  let internal_body_part = ''
  if(params_response) {
    internal_body_part += build_request_params_response(params_response)
  }

  if(authorization) {
    internal_body_part += build_request_authorization_response(authorization, path, 'GET')
  }

  response = build_response_default(response, path, 'DELETE')

  return `
    router.del('${path}', async (ctx) => {
      ctx.status = ${status}
      ${internal_body_part}
      ctx.body = ${response}
      return ctx
    })`
}

module.exports = {
  delete_template
}
