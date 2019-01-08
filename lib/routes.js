const router = require("koa-router")() 
const fs = require("fs") 
const path = require("path") 


    router.post('/example', async (ctx) => {
      ctx.status = 200
      ctx.body = {"example":"example POST"}
      return ctx
    })

    router.get('/example', async (ctx) => {
      ctx.status = 200
      ctx.body = {"example":"example GET"}
      return ctx
    })

    router.get('/html', async (ctx) => {
      ctx.status = 200
      ctx.body = fs.readFileSync("./misc/index.html")
      return ctx
    })
 module.exports = router.routes() 
