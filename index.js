":" //; exec /usr/bin/env node --harmony --expose-gc --trace-deprecation "$0" "$@"

const methodEnum = ['POST', 'GET', 'PUT', 'DELETE'];

const formResponse = (serverAction, method, pathname, response) => {
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
  put: (path, response) => {
    FakeServer.serverAction.push({
      called: false,
      callCount: 0,
      method: 'PUT',
      path, response
    })
  },
  post: (path, response) => {
    FakeServer.serverAction.push({
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
  delete: (path, response) => {
    FakeServer.serverAction.push({
      called: false,
      callCount: 0,
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
      const url = require('url').parse(request.url);
      const METHOD = request.method;
      const pathname = url.pathname;
      // const query = parseQuery(url.query)
      formResponse(FakeServer.serverAction, METHOD, pathname, response);
      response.end();
    }).listen(FakeServer.port ? FakeServer.port : 4000);
  }
};

module.exports = {
  FakeServer
};
