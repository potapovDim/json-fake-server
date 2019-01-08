const {form_response, stringify_response, is_file, is_string} = require('./utils')

function get_template({path, response, status = 200}) {
  response = form_response(response, path, 'GET')
  return `
    router.get('${path}', async (ctx) => {
      ctx.status = ${status}
      ctx.body = ${response}
      return ctx
    })`
}

module.exports = {
  get_template
}
