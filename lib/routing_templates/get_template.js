const {form_response, build_request_params_response} = require('./utils')

function get_template({path, response, status = 200, params_response}) {
  let params_body_part = ''
  if(params_response) {
    params_body_part += build_request_params_response(params_response)
  }

  // {
  //   "method": "POST",
  //   "path": "/example",
  //   "response": {
  //     "example": "example"
  //   }
  // }
  response = form_response(response, path, 'GET')

  return `
    router.get('${path}', async (ctx) => {
      ctx.status = ${status}
      ${params_body_part}
      ctx.body = ${response}
      return ctx
    })`
}

module.exports = {
  get_template
}
