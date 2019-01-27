const {get_koa_request_method} = require('../../commons/index')
/**
 *
 * @param {object} response_from_url
 * @param {string} path
 * @param {string} http_method
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
    const req_options = {}
    // set headers if exists, if not just empty string
    ${req_headers ? ('req_options.headers=' + JSON.stringify(req_headers)) : ''}
    let {body} = await request.${get_koa_request_method(method)}('${url}', ${JSON.stringify(req_body)}, req_options)
    body = ${merge_with ? '{...body,...' + merge_with_string + '}' : 'body'}
    ctx.status = ${status}
    ctx.body = body
    return ctx
  \n`
}

module.exports = {
  build_request_from_other_server_response
}
