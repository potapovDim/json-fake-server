const router = require("koa-router")() 
const fs = require("fs") 
const path = require("path") 
const {request} = require("../commons") 


    router.get('/', async (ctx) => {
      ctx.status = 200
      
      ctx.body = fs.readFileSync("/Users/dpot/Documents/mock-backend-rest/index.html", {'encoding': 'utf8'})
      return ctx
    })
 module.exports = router.routes() 
