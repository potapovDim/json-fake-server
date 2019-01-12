const router = require("koa-router")()
const fs = require("fs")
const path = require("path")

const {request} = require("../commons")


router.get('/user', async (ctx) => {
  ctx.status = 200

  ctx.body = {"part_from_user_service": {"user_profile": {"username": "some username", "postal_code": 3212654}}}
  return ctx
})
module.exports = router.routes()
