import Koa from 'koa2';
import bodyParser from 'koa-bodyparser';
import cors from 'koa-cors';
import logger from 'koa-logger';
import koaRouter from 'koa-router';
import { ceateManyRoutes as manyRoutes, createSingleRoute as singleRoutes, routes as initialRoutes } from './routes'
import { fakeGet, fakePost } from './actions'

class FakeServer {
  routes: Array<any>;
  callCount: number;
  called: boolean;
  logger: boolean;
  router: any;
  port: number;

  constructor(port: number, logger: boolean) {
    this.logger = logger;
    this.port = port;
    this.router = koaRouter();
    this.routes = initialRoutes;
    this.callCount = 0;
    this.called = false;
  };
  ceateManyRoutes() {
    manyRoutes()
    this.routes = initialRoutes;
  };
  createSingleRoute(pathOrRegex, method, response, condition, responseError) {
    singleRoutes(pathOrRegex, method, response, condition, responseError)
    this.routes = initialRoutes;
  };
  initializeRoutes() {
    this.routes.forEach(route => {
      if(route.method == 'POST') {
        this.router.post(route.pathOrRegex, fakePost(
          route.response,
          route.condition,
          route.responseError));
      } else {
        this.router.get(route.pathOrRegex, fakeGet(
          route.response,
          route.condition,
          route.responseError));
      }
    });
  };
  start() {
    const app = new Koa();

    app.use(bodyParser());
    app.use(cors());
    if(this.logger) {
      app.use(logger());
    };
    app.use(this.router());
    app.listen(this.port);
    console.log('server start on port ' + this.port);
  };
};
// if(process.env.NODE_ENV='test'){
//   const logger = require('koa-logger')
//   app.use(logger())
// }
// ceateManyRoutes().add('lol', 'post', {}, {}, {}).add('lol', 'post', {}, {}, {})
// app.use(require('./routes')())

// const PORT = port || 4422

// app.listen(PORT)

