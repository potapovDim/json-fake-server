import router from 'koa-router';

const routes = [];
let callCount = 0;
let called = false;

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