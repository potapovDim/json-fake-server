":" //; exec /usr/bin/env node --harmony --expose-gc --trace-deprecation "$0" "$@"

const methodEnum = ['POST', 'GET', 'PUT', 'DELETE'];


const formResult = (action) => {
  const act = Object.assign({}, action);
  Reflect.deleteProperty(act, 'path');
  Reflect.deleteProperty(act, 'response');
  return act;
}


const getCurrentPost = (path, actions) => {
  const result = actions.filter(action => action.method == 'POST' && action.path == path)
  return result.length == 1 ? formResult(result[0]) : {}
};
const getCurrentGet = (path, actions) => {
  const result = actions.filter(action => action.method == 'GET' && action.path == path)
  return result.length == 1 ? formResult(result[0]) : {}
};
const getCurrentPut = (path, actions) => {
  const result = actions.filter(action => action.method == 'PUT' && action.path == path)
  return result.length == 1 ? formResult(result[0]) : {}
};
const getCurrentDel = (path, actions) => {
  const result = actions.filter(action => action.method == 'DELETE' && action.path == path)
  return result.length == 1 ? formResult(result[0]) : {}
};

const formResponse = (serverAction, method, pathname, response, calledBody) => {
  if (!methodEnum.includes(method)) {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ body: 'method.not.support' }));
  };
  let actinoPresent = false
  let currentAction;
  serverAction.forEach((handler) => {
    if (handler.method == method && handler.path == pathname) {
      handler.called = true;
      handler.callCount++;
      handler.calledArgs.push(calledBody);
      actinoPresent = true;
      currentAction = handler;
    };
  });
  if (actinoPresent && currentAction) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(currentAction.response));
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ body: 'api.notfound' }));
  };
};

const FakeServer = {
  port: undefined,
  serverAction: [],
  getPostResult: (path) => getCurrentPost(path, FakeServer.serverAction),
  getGetResult: (path) => getCurrentGet(path, FakeServer.serverAction),
  getPutResult: (path) => getCurrentPut(path, FakeServer.serverAction),
  getDelResult: (path) =>  getCurrentDel(path, FakeServer.serverAction),
  put: (path, response) => {
    FakeServer.serverAction.push({
      called: false,
      calledArgs: [],
      callCount: 0,
      method: 'PUT',
      path, response
    })
  },
  post: (path, response) => {
    FakeServer.serverAction.push({
      calledArgs: [],
      called: false,
      callCount: 0,
      method: 'POST',
      path, response
    })
  },
  get: (path, response) => {
    FakeServer.serverAction.push({
      called: false,
      callCount: 0,
      method: 'GET',
      path, response
    })
  },
  del: (path, response) => {
    FakeServer.serverAction.push({
      called: false,
      callCount: 0,
      calledArgs: [],
      method: 'DELETE',
      path, response
    })
  },
  start: () => {
    const http = require('http');
    const fs = require('fs');
    const parseQuery = (queryString) => {
      let query = {}
      queryString.split('&&').forEach((item) => {
        let oneQuery = item.split('=');
        if (oneQuery.length == 1) {
          query[oneQuery[0]] = true
        } else {
          query[oneQuery[0]] = oneQuery[1]
        };
      });
      return query;
    };
    http.createServer((request, response) => {
      let body = ''
      const url = require('url').parse(request.url);
      const METHOD = request.method;
      const pathname = url.pathname;
      // const query = parseQuery(url.query)
      request.on('data', (chunk) => {
        body += chunk.toString('utf8');
      }).on('end', () => {
        try {
          body = JSON.parse(body);
        } catch (error) {
          console.error(error);
        }
      });
      formResponse(FakeServer.serverAction, METHOD, pathname, response);
      response.end();
    }).listen(FakeServer.port ? FakeServer.port : 4000);
  }
};

module.exports = {
  FakeServer
};
