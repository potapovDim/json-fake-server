const fs = require('fs')
const path = require('path')

// assertion part
function is_string(item) {
  return Object.prototype.toString.call(item) === '[object String]'
}

function is_file(item) {
  return fs.existsSync(item) || fs.existsSync(path.resolve(process.cwd(), item))
}

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

module.exports = {
  is_string,
  is_file,
  stringify_response,
  form_response
}
