"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var koa2_1 = require("koa2");
var app = new koa2_1.default();
var koa_bodyparser_1 = require("koa-bodyparser");
var koa_cors_1 = require("koa-cors");
var routes_1 = require("./routes");
app.use(koa_bodyparser_1.default());
app.use(koa_cors_1.default());
// if(process.env.NODE_ENV='test'){
//   const logger = require('koa-logger')
//   app.use(logger())
// }
routes_1.ceateManyRoutes().add('lol', 'post', {}, {}, {});
// app.use(require('./routes')())
// const PORT = port || 4422
// app.listen(PORT)
// console.log('server start on port ' + PORT) 
//# sourceMappingURL=index.js.map