const {form_response, build_request_params_response} = require('./build_koa_router_model')

function post_template({path, response, status = 200}) {
  response = form_response(response, path, 'POST')
  return `
    router.post('${path}', async (ctx) => {
      ctx.status = ${status}
      ctx.body = ${response}
      return ctx
    })`
}

module.exports = {
  post_template
}
