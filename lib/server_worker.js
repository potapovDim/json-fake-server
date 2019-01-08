const path = require('path')
const Koa = require('koa2')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const cors = require('koa-cors')

const {fs_write_sync} = require('./utils')
const {get_routing_model} = require('./json_routing_model')

module.exports = function(jsom_model_path) {
  console.log(jsom_model_path, '!!!!!!!!')
  fs_write_sync(path.resolve(__dirname, './routes.js'), get_routing_model(jsom_model_path))
  app.use(bodyParser())
  app.use(cors())

  if(process.env.NODE_ENV = 'test') {
    const logger = require('koa-logger')
    app.use(logger())
  }

  app.use(require('./routes'))
  return app
}
