const fs = require('fs')
const path = require('path')

// assertion part
function is_string(item) {
  return Object.prototype.toString.call(item) === '[object String]'
}

function is_file(item) {
  return fs.existsSync(item) || fs.existsSync(path.resolve(process.cwd(), item))
}
// assertion part end

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

function form_response(resp_item, path, http_method) {
  if(!is_string(resp_item)) {
    return stringify_response(resp_item, path, http_method)
  }
  if(is_string(resp_item) && is_file(resp_item)) {
    return `fs.readFileSync("${resp_item}")`
  }
  if(is_string(resp_item)) {
    return resp_item
  }
  return JSON.stringify({data: 'default'})
}


function post_template({path, response, status = 200}) {
  response = form_response(response, path, 'POST')
  return `
    router.post('${path}', async (ctx) => {
      ctx.status = ${status}
      ctx.body = ${response}
      return ctx
    })`
}

function get_template({path, response, status = 200}) {
  response = form_response(response, path, 'GET')
  return `
    router.get('${path}', async (ctx) => {
      ctx.status = ${status}
      ctx.body = ${response}
      return ctx
    })`
}

function put_template({path, response, status = 200}) {
  response = form_response(response, path, 'PUT')
  return `
    router.put('${path}', async (ctx) => {
      ctx.status = ${status}
      ctx.body = ${response}
      return ctx
    })`
}

function delete_template({path, response, status = 200}) {
  response = form_response(response, path, 'DELETE')
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
