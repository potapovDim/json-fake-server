const Router = require("koa-router") 
const fs = require("fs") 
const path = require("path") 
const {request} = require("../commons") 
// temp_model {"port":8081,"api":[{"method":"GET","path":"/user","response_from_url":{"req_body":{},"req_headers":{},"status":201,"method":"GET","url":"http://localhost:8888/userData","merge_with":{"part_from_entrypoint":"entry point"}},"response":{"example":"example GET"}}]} 
const router = new Router()

    router.get('/user', async (ctx) => {
      ctx.status = 200
      

    let {body} = await request.get('http://localhost:8888/userData', {})
    body = {...body,...{"part_from_entrypoint":"entry point"}}
    ctx.status = 201
    ctx.body = body
    return ctx
  

      ctx.body = {"example":"example GET"}
      return ctx
    })
 module.exports = router.routes() 
