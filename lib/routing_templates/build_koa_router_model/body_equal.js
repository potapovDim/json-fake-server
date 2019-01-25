const {build_response_default} = require('./body_default')

/**
* @returns {Promise<string>|Promise<null>} return null if command executed successful or cmd if something went wrong
*/

function build_request_body_equal_response(body_equal, path, http_method) {

  const {not_equal_response = {data: 'invalid request'}, status = 404, expected_body} = body_equal

  return `\n
    if(!deep_equal(ctx.request.body, ${build_response_default(expected_body)})) {
      ctx.status = ${status}
      ctx.body = ${build_response_default(not_equal_response)}

      return ctx
    }
  \n`
}

module.exports = {
  build_request_body_equal_response
}
