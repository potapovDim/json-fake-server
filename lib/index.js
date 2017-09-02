const path = require('path');
const {formResult, parseJson, killServer, getCurrentAction} = require('./util');

const methodEnum = ['POST', 'GET', 'PUT', 'DELETE'];

const assertResponse = (response) => {
  if (typeof response == 'string') {
    const pathToResponse = path.resolve(process.cwd(), response);
    try {
      return require(pathToResponse);
    } catch (error) {
      console.error(error)
    }
  };
  return response;
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
      !(method == 'GET') && handler.calledArgs.push(calledBody);
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
  server: undefined,
  runned: false,
  serverAction: [],
  getPostResult: (path) => getCurrentAction(path, 'POST', FakeServer.serverAction),
  getGetResult: (path) => getCurrentAction(path, 'GET', FakeServer.serverAction),
  getPutResult: (path) => getCurrentAction(path, 'PUT', FakeServer.serverAction),
  getDelResult: (path) => getCurrentAction(path, 'DELETE', FakeServer.serverAction),
  put: (path, response) => {
    FakeServer.serverAction.push({
      called: false,
      calledArgs: [],
      callCount: 0,
      method: 'PUT',
      path,
      response: assertResponse(response)
    })
  },
  post: (path, response) => {
    FakeServer.serverAction.push({
      calledArgs: [],
      called: false,
      callCount: 0,
      method: 'POST',
      path,
      response: assertResponse(response)
    })
  },
  get: (path, response) => {
    FakeServer.serverAction.push({
      called: false,
      callCount: 0,
      method: 'GET',
      path,
      response: assertResponse(response)
    })
  },
  del: (path, response) => {
    FakeServer.serverAction.push({
      called: false,
      callCount: 0,
      calledArgs: [],
      method: 'DELETE',
      response: assertResponse(response)
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
    FakeServer.runned = true;
    FakeServer.server = http.createServer((request, response) => {
      let requestBody = ''
      const url = require('url').parse(request.url);
      const METHOD = request.method;
      const pathname = url.pathname;

      request.on('data', (chunk) => {
        requestBody += chunk.toString('utf8');
      }).on('end', () => {
        try {
          requestBody = !(METHOD == 'GET') ? parseJson(requestBody) : '';
          formResponse(FakeServer.serverAction, METHOD, pathname, response, requestBody);
          response.end();
        } catch (error) {
          console.error(error);
        }
      });

    }).listen(FakeServer.port ? FakeServer.port : 4000);
  },
  stop: () => {
    try {
      killServer(FakeServer.server).kill();
    } catch (e) {
      console.error('Server not started');
    };
  },
  restore: () => {
    killServer(FakeServer.server).kill();
    FakeServer.port = undefined;
    FakeServer.runned = false;
    FakeServer.serverAction = [];
    FakeServer.server = undefined;
  }
};

module.exports = FakeServer;