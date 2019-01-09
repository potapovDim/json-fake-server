const router = require("koa-router")() 
const fs = require("fs") 
const path = require("path") 


    router.post('/example', async (ctx) => {
      ctx.status = 200
      ctx.body = {"example":"example POST"}
      return ctx
    })

    router.get('/user/:user/id/:id', async (ctx) => {
      ctx.status = 200
      
 const id = ctx.params.id 
const user = ctx.params.user 
 
 if(id === "testId" && user === "testUser") { 

                            ctx.body = {"full_params_equal":{"username":"test user1","password":"test password"}} 

                            return ctx
                          } 
if(id === "testId"){ 

          ctx.body = {"testId":"testId"} 

          return ctx
        }if(user === "testUser"){ 

          ctx.body = {"testId":"testId"} 

          return ctx
        } 

      ctx.body = {"example":"example GET"}
      return ctx
    })

    router.get('/html', async (ctx) => {
      ctx.status = 200
      
      ctx.body = fs.readFileSync("./misc/index.html", {'encoding': 'utf8'})
      return ctx
    })
 module.exports = router.routes() 
