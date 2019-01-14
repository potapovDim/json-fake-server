const Router = require("koa-router") 
const fs = require("fs") 
const path = require("path") 
const {request} = require("../commons") 
const querystring = require("querystring") 
// temp_model {"port":"8081","api":[{"method":"GET","path":"/test","response":{"testOne":1,"testTwo":2,"testThree":3,"testFour":4}}]} 
const router = new Router()

    router.get('/test', async (ctx) => {
      ctx.status = 200
      

   if(ctx.request.querystring) {

    const query_obj = querystring.parse(ctx.request.querystring)
    const query_obj_keys = Object.keys(query_obj)

    const response_holder = {"testOne":1,"testTwo":2,"testThree":3,"testFour":4}

    if(Array.isArray(response_holder)) {
      // logic for assertion
      const filtred_obj = response_holder.filter(function (resp_item) {
        // assert partly
        const is_all_keys_equal = query_obj_keys.every(function(key) {
          console.log(resp_item[key] === query_obj[key], resp_item[key] ,query_obj[key])
          return resp_item[key] ==å query_obj[key]
        })
        return is_all_keys_equal
      })
      ctx.body = filtred_obj
    } else if(Object.prototype.toString.call(response_holder) === "[object Object]") {
      ctx.body = query_obj_keys.reduce(function (acc, key) {
        if(response_holder[key]) { acc[key] = response_holder[key] }
        return acc
      }, {})
    } else {
      ctx.body = response_holder
    }
    return ctx
   }
  

      ctx.body = {"testOne":1,"testTwo":2,"testThree":3,"testFour":4}
      return ctx
    })
 module.exports = router.routes() 
