const {build_response_default} = require('./body_default')

/**
 *
 * @param {object} params
 * @param {string} path
 * @param {string} http_method
 */
function build_request_params_response(params, path, http_method) {
  const {response, ...params_without_general_response} = params

  function form_params_variables(params) {
    // params example
    // "id": {
    //   "value": "testId",
    //   "response": {
    //     "testId": "testId"
    //   }
    // },
    // "user": {
    //   "value": "testUser",
    //   "response": {
    //     "testId": "testId"
    //   }
    // },
    return Object.keys(params).reduce((rout_body_part, key) => {
      rout_body_part += `const ${key} = ctx.params.${key} \n`
      return rout_body_part
    }, '')
  }

  function form_conditional_statements(params, general_response) {
    let condition_statements = ''
    // params example
    // "id": {
    //   "value": "testId",
    //   "response": {
    //     "testId": "testId"
    //   }
    // },
    // "user": {
    //   "value": "testUser",
    //   "response": {
    //     "testId": "testId"
    //   }
    // }
    // general_response examplecc
    // {"testId": "testId"}
    const params_keys = Object.keys(params)

    if(general_response) {
      condition_statements += params_keys.reduce((statement_start, key, index) => {
        // if not last item in if need add "&&" as default
        const is_last_item = params_keys.length - 1 === index

        let assert_item = params[key].value ? `${key} === "${params[key].value}"` : key

        if(is_last_item) {
          // close ) of is statement and start to form closure body
          assert_item += `) { \n
                            ctx.body = ${build_response_default(general_response, path, http_method)} \n
                            return ctx
                          } \n`
        } else {
          assert_item += ' && '
        }
        statement_start += assert_item
        return statement_start
      }, 'if(')
      // should be something like
      // if(a=="test" && b){
      //   ctx.body = {"test":"test"}
      //   return ctx
      // }
    }
    condition_statements += params_keys.reduce((statement_start, key) => {
      function add_condition_arguments(assertion) {
        return `if(${assertion})`
      }

      let assert_item = add_condition_arguments(params[key].value ? `${key} === "${params[key].value}"` : key)
      // body implementation
      if(params[key].response) {
        assert_item += `{ \n
          ctx.body = ${build_response_default(params[key].response, path, http_method)} \n
          return ctx
        }`
      } else {
        assert_item += '{}'
      }
      statement_start += assert_item
      return statement_start
    }, '')
    return condition_statements
  }

  // example
  // const a = ctx.params.a
  // const b = ctx.params.a
  const params_koa_part = form_params_variables(params_without_general_response)

  const params_conditions_part = form_conditional_statements(params_without_general_response, response)

  return `\n ${params_koa_part} \n ${params_conditions_part} \n`
}

module.exports = {
  build_request_params_response
}
