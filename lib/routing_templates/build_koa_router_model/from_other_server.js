const {get_koa_request_method} = require('../../commons/index')
const {build_response_default} = require('./body_default')
/**
 *
 * @param {object} response_from_url
 * @param {string} path
 * @param {string} http_method
 */
function build_request_from_other_server_response(response_from_url, path, http_method) {

  const {req_body = '', method, req_headers, status = 200, url, merge_with} = response_from_url

  const merge_with_string = build_response_default(merge_with, path, http_method)
  const req_body_string = build_response_default(req_body, path, http_method)

  return `\n
    const req_options = {}
    // set headers if exists, if not just empty string
    ${req_headers ? ('req_options.headers=' + JSON.stringify(req_headers)) : ''}
    let {body} = await request.${get_koa_request_method(method)}('${url}', ${req_body_string}, req_options)
    body = ${merge_with ? '{...body,...' + merge_with_string + '}' : 'body'}
    ctx.status = ${status}
    ctx.body = body
    return ctx
  \n`
}

module.exports = {
  build_request_from_other_server_response
}
