import Router from 'koa-router';
export const routes = [];

export const createSingleRoute = (pathOrRegex, method, response, condition, responseError) => {
  routes.push({ method, pathOrRegex, condition, response, responseError })
};

export const ceateManyRoutes = () => {
  const routerEmitter = {
    add: function (method, pathOrRegex, response, condition, responseError) {
      routes.push({ method, pathOrRegex, response, condition, responseError })
      return routerEmitter;
    }
  }
  return routerEmitter;
};

const router = new Router();

