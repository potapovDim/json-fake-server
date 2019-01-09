const {form_response, build_request_params_response} = require('./build_koa_router_model')

function delete_template({path, response, status = 200}) {
  let params_body_part = ''
  if(params_response) {
    params_body_part += build_request_params_response(params_response)
  }

  response = form_response(response, path, 'DELETE')

  return `
    router.del('${path}', async (ctx) => {
      ctx.status = ${status}
      ${params_body_part}
      ctx.body = ${response}
      return ctx
    })`
}

module.exports = {
  delete_template
}
