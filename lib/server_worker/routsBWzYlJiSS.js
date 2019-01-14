const Router = require("koa-router") 
const fs = require("fs") 
const path = require("path") 
const {request} = require("../commons") 
// temp_model {"port":8888,"api":[{"method":"GET","path":"/index","response":"/Users/dpot/Documents/mock-backend-rest/specs/misc/index.html"}]} 
const router = new Router()

    router.get('/index', async (ctx) => {
      ctx.status = 200
      
      ctx.body = fs.readFileSync("/Users/dpot/Documents/mock-backend-rest/specs/misc/index.html", {'encoding': 'utf8'})
      return ctx
    })
 module.exports = router.routes() 
