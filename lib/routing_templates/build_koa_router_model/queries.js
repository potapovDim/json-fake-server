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
    const query_obj_keys = Object.keys(query_obj)

    const response_holder = ${temp_response_string}

    if(Array.isArray(response_holder)) {
      const filtred_obj = response_holder.reduce(function (acc, resp_item) {
        const temp_obj = {}

        query_obj_keys.forEach(function(query_key) {
          if(resp_item[query_key] && resp_item[query_key] == query_obj[query_key]) {
            temp_obj[query_key] = resp_item[query_key]
          }
        })

        if(Object.keys(temp_obj).length) {acc.push(temp_obj)}
        return acc
      }, [])

      ctx.body = filtred_obj
    } else if(Object.prototype.toString.call(response_holder) === "[object Object]") {
      ctx.body = query_obj_keys.reduce(function (acc, key) {
        if(response_holder[key]) { acc[key] = response_holder[key] }
        return acc
      }, {})
    } else {
      ctx.body = response_holder
    }
    return ctx
   }
  \n`
}

module.exports = {
  build_request_queries_response
}
