const App = require('koa2')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const app = new App()

const router = new Router()
router.post('/:id/:lol', async (ctx) => {
  console.log(ctx.request.body)
  console.log(ctx.request.query)
  console.log(ctx.params)
  ctx.body = {a: 1}
})
app.use(bodyParser())
app.use(router.routes())


app.listen(4000)