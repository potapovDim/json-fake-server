const router = require("koa-router")() 
const fs = require("fs") 
const path = require("path") 
const {request} = require("../commons") 


    router.get('/user', async (ctx) => {
      ctx.status = 200
      
      ctx.body = {"user_response_success":"user_response_success"}
      return ctx
    })
 module.exports = router.routes() 
