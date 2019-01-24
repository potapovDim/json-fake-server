const {build_request_from_other_server_response} = require('./from_other_server')
const {build_request_authorization_response} = require('./authorization')
const {build_request_body_equal_response} = require('./body_equal')
const {build_request_queries_response} = require('./queries')
const {build_request_params_response} = require('./params')
const {build_response_default} = require('./body_default')

module.exports = {
  build_response_default,
  build_request_params_response,
  build_request_queries_response,
  build_request_body_equal_response,
  build_request_authorization_response,
  build_request_from_other_server_response
}
