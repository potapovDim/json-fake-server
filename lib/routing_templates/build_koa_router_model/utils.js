const fs = require('fs')
const path = require('path')

/**
 * @param {any} item argument what will be asserted as a string
 * @returns {boolean} returns if argument item is string
*/
function is_string(item) {
  return Object.prototype.toString.call(item) === '[object String]'
}

/**
 * @param {any} item argument what will be asserted as a file what should be found if FS
 * @returns {boolean} returns if argument item is file what exists in FS
*/
function is_file(item) {
  return fs.existsSync(item) || fs.existsSync(path.resolve(process.cwd(), item))
}

function to_error(path, method) {
  throw new Error(
    'Something went wrong with response data' +
    `Please check item with path: ${path} where method is: ${method}`
  )
}

module.exports = {
  is_file,
  is_string,
  to_error
}
