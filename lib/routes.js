const router = require("koa-router")()



router.post('/example', async (ctx) => {
  ctx.status = 200
  ctx.body = {"example": "example POST"}
  return ctx
})


router.get('/example', async (ctx) => {
  ctx.status = 200
  ctx.body = {"example": "example GET"}
  return ctx
})

module.exports = router.routes()
