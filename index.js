":" //; exec /usr/bin/env node --harmony --expose-gc --trace-deprecation "$0" "$@"

const FakeServer = {
  port: undefined,
  serverAction: [],
  put: (path, response) => {
    FakeServer.serverAction.push({
      method: 'PUT',
      path, response
    })
  },
  post: (path, response) => {
    FakeServer.serverAction.push({
      method: 'POST',
      path, response
    })
  },
  get: (path, response) => {
    FakeServer.serverAction.push({
      method: 'GET',
      path, response
    })
  },
  delete: (path, response) => {
    FakeServer.serverAction.push({
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
      FakeServer.serverAction.forEach((handler) => {
        if (handler.method == METHOD && handler.path == pathname) {
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.write(JSON.stringify(handler.response));
        } else {
          response.writeHead(404, { 'Content-Type': 'application/json' });
          response.write(JSON.stringify({body: 'api.notfound'}));
        }
      })
      response.end();
    }).listen(FakeServer.port ? FakeServer.port : 4000);
  }
};

module.exports = {
  FakeServer
}