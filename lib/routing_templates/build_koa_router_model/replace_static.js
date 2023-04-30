const {build_response_default} = require('./body_default')

/**
 *
 * @param {object|string|array} body_equal
 * @param {string} path
 * @param {string} http_method
 */
function build_request_replace_static(request_body, path, http_method) {

  const {response = {success: true}, status = 404, content_path} = request_body

  return `\n
    try {
      const {content} = ctx.request.body;
      fs.writeFileSync("${content_path}", content, {encoding: 'utf8'});
      ctx.status = 201;
      ctx.body = ${build_response_default(response, path, http_method)}
    } catch (e) {
      ctx.status = ${status};
      ctx.body = e.toString()
    }

    return ctx
  \n`
}

module.exports = {
  build_request_replace_static
}
