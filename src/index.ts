import Koa from 'koa2';
import bodyParser from 'koa-bodyparser';
import cors from 'koa-cors';
import {ceateManyRoutes} from './routes'


const app = new Koa();

app.use(bodyParser())
app.use(cors())
// if(process.env.NODE_ENV='test'){
//   const logger = require('koa-logger')
//   app.use(logger())
// }
ceateManyRoutes().add('lol', 'post', {}, {}, {}).add('lol', 'post', {}, {}, {})
// app.use(require('./routes')())

// const PORT = port || 4422

// app.listen(PORT)

// console.log('server start on port ' + PORT)