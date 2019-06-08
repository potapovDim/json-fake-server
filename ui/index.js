const Koa = require('koa2')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const fs = require('fs')
const path = require('path')

const app = new Koa()
const router = new Router()

router.get('*', (ctx) => {
  ctx.status = 200
  ctx.body = fs.readFileSync(path.resolve(__dirname, './index.html')).toString()
  return ctx
});

router.post('/create-server', () => {

})

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())


app.listen(3000);