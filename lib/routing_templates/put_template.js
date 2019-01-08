const {form_response} = require('./utils')

function put_template({path, response, status = 200}) {
  response = form_response(response, path, 'PUT')
  return `
    router.put('${path}', async (ctx) => {
      ctx.status = ${status}
      ctx.body = ${response}
      return ctx
    })`
}

module.exports = {
  put_template
}
