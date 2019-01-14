const Router = require("koa-router") 
const fs = require("fs") 
const path = require("path") 
const {request} = require("../commons") 
// temp_model {"port":8888,"api":[{"method":"GET","path":"/user","response":{"user_response_success":"user_response_success"}}]} 
const router = new Router()

    router.get('/user', async (ctx) => {
      ctx.status = 200
      
      ctx.body = {"user_response_success":"user_response_success"}
      return ctx
    })
 module.exports = router.routes() 
