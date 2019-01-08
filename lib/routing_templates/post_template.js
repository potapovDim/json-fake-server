const {form_response} = require('./utils')

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
