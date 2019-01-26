const methods_map = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  DELETE: 'del',
  PATCH: 'patch'
}

/**
 * @param {string}  http_method one of HTTP methods POST,PUT,GET,DELETE
 * @returns {string} returns KOA router or request method one of post,get,put,gel
 * @throws exception if method does not supported
 */
function get_koa_request_method(http_method) {
  const method = methods_map[http_method]
  if(method) return method
  throw new Error(`"${http_method}" method is not supported`)
}

module.exports = {
  get_koa_request_method
}
