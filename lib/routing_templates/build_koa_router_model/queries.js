const {build_response_default} = require('./body_default')

/**
  * @param {object} response
  * @param {string} path
  * @param {string} http_method
  * @returns {string}
*/
function build_request_queries_response(response, path, http_method) {
  const temp_response_string = build_response_default(response, path, http_method)

  // temporary useless code part for future execution
  const get_response = `
    function get_response_type(resp) {
      const types = [
          "[object Object]",
          "[object Array]",
          "[object String]",
          "[object Undefined]",
          "[object Null]"
      ]
    }
  `

  return `\n
   if(ctx.request.querystring) {

    const query_obj = querystring.parse(ctx.request.querystring)
    const query_obj_keys = Object.keys(query_obj)

    const response_holder = ${temp_response_string}

    if(Array.isArray(response_holder)) {
      // logic for assertion
      const filtred_obj = response_holder.reduce(function (resp_item) {
        // assert partly

        const is_all_keys_equal = query_obj_keys.every(function(key) {
          console.log(resp_item[key] === query_obj[key], resp_item[key] ,query_obj[key])
          return resp_item[key] == query_obj[key]
        })
        return is_all_keys_equal

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
