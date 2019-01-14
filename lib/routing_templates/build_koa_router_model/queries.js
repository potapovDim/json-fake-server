const {build_response_default} = require('./body_default')


/**
  * @param {object} response
  * @param {string} path
  * @param {string} http_method
  * @returns {string}
*/
function build_request_queries_response(response, path, http_method) {
  const temp_response_string = build_response_default(response, path, http_method)

  return `\n
   if(ctx.request.querystring) {
    const query_obj = querystring.parse(ctx.request.querystring)


   }
  \n`
}

module.exports = {
  build_request_queries_response
}

// querystring