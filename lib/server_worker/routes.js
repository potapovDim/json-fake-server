const router = require("koa-router")() 
const fs = require("fs") 
const path = require("path") 
const {request} = require("../commons") 


    router.get('/example', async (ctx) => {
      ctx.status = 200
      

    const token = ctx.request.token
    if(token !== 'testToken') {
      ctx.status = 401
      ctx.body = {"unauthorized":"unauthorized"}
      return ctx
    }
  

      ctx.body = {"example":"example GET"}
      return ctx
    })
 module.exports = router.routes() 
