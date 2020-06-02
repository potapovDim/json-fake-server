const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const fs = require('fs')
const path = require('path')

const app = new Koa()
const router = new Router()

router.get('*', (ctx) => {
  ctx.status = 200
  ctx.header['Content-Type'] = 'text/html'
  ctx.body = fs.readFileSync(path.resolve(__dirname, './index.html')).toString()
  return ctx
});

router.post('/create-server', (ctx) => {
  console.log(ctx.request.body)
  ctx.status = 200
  ctx.body = 'OK'
  return ctx
})

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())


app.listen(3000);