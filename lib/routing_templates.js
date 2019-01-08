// {
//   "method": "POST",
//   "path": "/example",
//   "response": {
//     "example": "example"
//   }
// }

function stringify_response(item, path, method) {
  try {
    return JSON.stringify(item)
  } catch(_) {
    throw new Error(
      'Something went wrong with response data' +
      `Please check item with path: ${path} where method is: ${method}`
    )
  }
}

function is_string(item) {
  return Object.prototype.toString.call(item) === '[object String]'
}

function post_template({path, response, status = 200}) {
  response = is_string(response) ? response : stringify_response(response, path, 'POST')
  return `
    router.post('${path}', async (ctx) => {
      ctx.status = ${status}
      ctx.body = ${response}
      return ctx
    })`
}

function get_template({path, response, status = 200}) {
  response = is_string(response) ? response : stringify_response(response, path, 'GET')
  return `
    router.get('${path}', async (ctx) => {
      ctx.status = ${status}
      ctx.body = ${response}
      return ctx
    })`
}

function put_template({path, response, status = 200}) {
  response = is_string(response) ? response : stringify_response(response, path, 'PUT')
  return `
    router.put('${path}', async (ctx) => {
      ctx.status = ${status}
      ctx.body = ${response}
      return ctx
    })`
}

function delete_template({path, response, status = 200}) {
  response = is_string(response) ? response : stringify_response(response, path, 'DELETE')
  return `
    router.del('${path}', async (ctx) => {
      ctx.status = ${status}
      ctx.body = ${response}
      return ctx
    })`
}

module.exports = {
  post: post_template,
  get: get_template,
  put: put_template,
  del: delete_template
}
