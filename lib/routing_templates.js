function post_template(req_path, response_body, response_status = 200) {
  return `
    router.post(${req_path}, async (ctx) => {
      ctx.status = ${response_status}
      ctx.body = ${response_body}
      return ctx
    })`
}

function get_template(req_path, response_body, response_status = 200) {
  return `
    router.get(${req_path}, async (ctx) => {
      ctx.status = ${response_status}
      ctx.body = ${response_body}
      return ctx
    })`
}

function put_template(req_path, response_body, response_status = 200) {
  return `
    router.(${req_path}, async (ctx) => {
      ctx.status = ${response_status}
      ctx.body = ${response_body}
      return ctx
    })`
}

function delete_template(req_path, response_body, response_status = 200) {
  return `
    router.del(${req_path}, async (ctx) => {
      ctx.status = ${response_status}
      ctx.body = ${response_body}
      return ctx
    })`
}

module.exports = {
  post_template,
  get_template,
  put_template,
  delete_template
}
