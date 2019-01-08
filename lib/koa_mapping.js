const methods_map = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  DELETE: 'del'
}

function get_koa_method(model_method) {
  const method = methods_map[model_method]
  if(method) return method
  throw new Error(`"${model_method}" method is not supported`)
}

module.exports = {
  get_koa_method
}
