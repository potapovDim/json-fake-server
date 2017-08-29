":" //; exec /usr/bin/env node --harmony --expose-gc --trace-deprecation "$0" "$@"


const methodHandler = (method, cb, ...rest) => {
  switch (method) {
    case 'DELETE':
      cd && rest ? cb(rest) : cd && !rest ? cd() : null
      break;
    case 'POST':
      cd && rest ? cb(rest) : cd && !rest ? cd() : null
      break;
    case 'GET':
      cd && rest ? cb(rest) : cd && !rest ? cd() : null
      break;
    case 'PUT':
      cd && rest ? cb(rest) : cd && !rest ? cd() : null
      break;
  };
};




const FakeServer = {
  serverAction =[],
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
    const url = require('url');
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
      const url = url.parse(request.url);
      const METHOD = request.method;
      const query = parseQuery(pathname.query)
      FakeServer.serverAction.forEach((handler))
      // response.writeHead(404, { 'Content-Type': 'text/html' });
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(data.toString());
      response.end();

    }).listen(8085);
  };
};
