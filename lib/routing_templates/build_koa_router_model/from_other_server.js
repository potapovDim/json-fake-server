const {get_koa_request_method} = require('../../commons/index')

/**
* @param {string} cmd command what should be executed
* @returns {Promise<string>|Promise<null>} return null if command executed successful or cmd if something went wrong
*/

function build_request_from_other_server_response(response_from_url, path, http_method) {

  const {
    req_body = '',
    method,
    req_headers,
    status = 200,
    url,
    merge_with
  } = response_from_url

  const merge_with_string = JSON.stringify(merge_with)
  return `\n
    let {body} = await request.${get_koa_request_method(method)}('${url}', ${JSON.stringify(req_body)})
    body = ${merge_with ? '{...body,...' + merge_with_string + '}' : 'body'}
    ctx.status = ${status}
    ctx.body = body
    return ctx
  \n`
}

module.exports = {
  build_request_from_other_server_response
}
