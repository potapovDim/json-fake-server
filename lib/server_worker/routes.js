const router = require("koa-router")() 
const fs = require("fs") 
const path = require("path") 
const {request} = require("../commons") 


    router.get('/example', async (ctx) => {
      ctx.status = 200
      
      ctx.body = {"example":"example GET"}
      return ctx
    })

    router.post('/example', async (ctx) => {
      ctx.status = 200
      
      ctx.body = {"example":"example POST"}
      return ctx
    })

    router.del('/example', async (ctx) => {
      ctx.status = 200
      
      ctx.body = {"example":"example DELETE"}
      return ctx
    })

    router.put('/example', async (ctx) => {
      ctx.status = 200
      
      ctx.body = {"example":"example PUT"}
      return ctx
    })
 module.exports = router.routes() 
