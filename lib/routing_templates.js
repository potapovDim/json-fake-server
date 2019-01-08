// {
//   "method": "POST",
//   "path": "/example",
//   "response": {
//     "example": "example"
//   }
// }

function post_template({path, response, status = 200}) {
  return `
    router.post(${path}, async (ctx) => {
      ctx.status = ${status}
      ctx.body = ${response}
      return ctx
    })`
}

function get_template({path, response, status = 200}) {
  return `
    router.get(${path}, async (ctx) => {
      ctx.status = ${status}
      ctx.body = ${response}
      return ctx
    })`
}

function put_template({path, response, status = 200}) {
  return `
    router.put(${path}, async (ctx) => {
      ctx.status = ${status}
      ctx.body = ${response}
      return ctx
    })`
}

function delete_template({path, response, status = 200}) {
  return `
    router.del(${path}, async (ctx) => {
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
