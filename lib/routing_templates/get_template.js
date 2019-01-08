const {form_response} = require('./utils')



function get_template({path, response, status = 200, params_response}) {
  if(params_response) {
    const keys_length = Object.keys(params_response).length

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
      ctx.body = ${response}
      return ctx
    })`
}

module.exports = {
  get_template
}
