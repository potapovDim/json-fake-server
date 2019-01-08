const {post_template} = require('./post_template')
const {get_template} = require('./get_template')
const {delete_template} = require('./delete_template')
const {put_template} = require('./put_template')


module.exports = {
  post: post_template,
  get: get_template,
  put: put_template,
  del: delete_template
}
