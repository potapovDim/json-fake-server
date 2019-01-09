const fetch = require('node-fetch')
// const URL = require('url')

async function _fetchy(method, url, body, opts) {
  // const url = URL.resolve(host, path)
  opts = opts || {};

  const headers = opts.headers || {}

  if(method == "GET") body = undefined
  if(body != null) {
    headers["Content-Type"] = "application/json"
  }
  const response = await fetch(url, Object.assign({
    method, headers, body: typeof body === 'object' ? JSON.stringify(body) : body
  }, opts))

  const contentType = response.headers.get("content-type")
  if(contentType && contentType.includes("application/json")) {
    const body = await response.json()
    return {body, status: response.status, headers: response.headers}
  } else {
    return {body: await response.text(), status: response.status, headers: response.headers}
  }
}

module.exports = {
  get: _fetchy.bind(global, "GET"),
  put: _fetchy.bind(global, "PUT"),
  post: _fetchy.bind(global, "POST"),
  del: _fetchy.bind(global, "DELETE")
}
