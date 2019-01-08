const {form_response} = require('./utils')

function delete_template({path, response, status = 200}) {
  response = form_response(response, path, 'DELETE')
  return `
    router.del('${path}', async (ctx) => {
      ctx.status = ${status}
      ctx.body = ${response}
      return ctx
    })`
}

module.exports = {
  delete_template
}
