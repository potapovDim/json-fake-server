const Router = require("koa-router") 
const fs = require("fs") 
const path = require("path") 
const {request} = require("../commons") 
// temp_model {"port":8888,"api":[{"method":"GET","path":"/userData","response":{"part_from_user_service":{"user_profile":{"username":"some username","postal_code":3212654}}}}]} 
const router = new Router()

    router.get('/userData', async (ctx) => {
      ctx.status = 200
      
      ctx.body = {"part_from_user_service":{"user_profile":{"username":"some username","postal_code":3212654}}}
      return ctx
    })
 module.exports = router.routes() 
