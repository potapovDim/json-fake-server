const {
  formResult,
  parseJson,
  killServer,
  getCurrentAction,
  stringifyJson,
  assertResponse
} = require('./util');

const methodEnum = ['POST', 'GET', 'PUT', 'DELETE'];

const formResponse = (serverAction, method, pathname, response, calledBody, responseFormat) => {
  if (!methodEnum.includes(method)) {
    response.writeHead(404, {'Content-Type': 'application/json'});
    response.write(stringifyJson({body: 'method.not.support'}));
  };
  let actinoPresent = false
  let currentAction;
  if (responseFormat == 'test') {
    serverAction.forEach((handler) => {
      if (handler.method == method && handler.path == pathname) {
        handler.called = true;
        handler.callCount++;
        !(method == 'GET') && handler
          .calledArgs
          .push(calledBody);
        actinoPresent = true;
        currentAction = handler;
      };
    });
    if (actinoPresent && currentAction) {
      response.writeHead(200, {'Content-Type': 'text/plain'});
      try {
        response.write(stringifyJson(currentAction.response));
      } catch (e) {
        console.error('when forma text response should be a string');
      }
    } else {
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.write(stringifyJson('api.notfound'));
    };
  } else {
    serverAction.forEach((handler) => {
      if (handler.method == method && handler.path == pathname) {
        handler.called = true;
        handler.callCount++;
        !(method == 'GET') && handler
          .calledArgs
          .push(calledBody);
        actinoPresent = true;
        currentAction = handler;
      };
    });
    if (actinoPresent && currentAction) {
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.write(stringifyJson(currentAction.response));
    } else {
      response.writeHead(404, {'Content-Type': 'application/json'});
      response.write(stringifyJson({body: 'api.notfound'}));
    };
  }
};

class FakeServer {
  constructor(port, responseFormat) {
    this.port = port || 4000;
    this.responseFormat = responseFormat || 'json';
    this.server = undefined;
    this.runned = false;
    this.serverAction = [];
  }
  getPostResult(path) {
    return getCurrentAction(path, 'POST', this.serverAction)
  }

  getGetResult(path) {
    return getCurrentAction(path, 'GET', this.serverAction)
  }
  getPutResult(path) {
    return getCurrentAction(path, 'PUT', this.serverAction)
  }
  getDelResult(path) {
    return getCurrentAction(path, 'DELETE', this.serverAction)
  }
  put(path, response, ...args) {
    const [assertRequestBody, requestBody] = args
    this
      .serverAction
      .push({
        called: false,
        assertRequest: false,
        calledArgs: [],
        callCount: 0,
        method: 'PUT',
        path,
        response: assertResponse(response)
      })
  };
  post(path, response, ...args) {
    this
      .serverAction
      .push({
        calledArgs: [],
        called: false,
        assertRequest: false,
        callCount: 0,
        method: 'POST',
        path,
        response: assertResponse(response)
      })
  };
  get(path, response, ...args) {
    this
      .serverAction
      .push({
        called: false,
        assertRequest: false,
        callCount: 0,
        method: 'GET',
        path,
        response: assertResponse(response)
      })
  };
  del(path, response) {
    this
      .serverAction
      .push({
        called: false,
        assertRequest: false,
        callCount: 0,
        calledArgs: [],
        method: 'DELETE',
        response: assertResponse(response)
      })
  };
  start() {
    const http = require('http');
    this.runned = true;
    this.server = http.createServer((request, response) => {
      let requestBody = ''
      const url = require('url').parse(request.url);
      const METHOD = request.method;
      const pathname = url.pathname;

      request.on('data', (chunk) => {
        requestBody += chunk.toString('utf8');
      }).on('end', () => {
        try {
          requestBody = !(METHOD == 'GET')
            ? parseJson(requestBody)
            : '';
          formResponse(this.serverAction, METHOD, pathname, response, requestBody, this.responseFormat);
          response.end();
        } catch (error) {
          console.error(error);
        }
      });

    }).listen(this.port
      ? this.port
      : 4000);
  };
  stop() {
    try {
      killServer(FakeServer.server).kill();
    } catch (e) {
      console.error('Server not started');
    };
  };
  restore() {
    killServer(this.server).kill();
    this.port = undefined;
    this.runned = false;
    this.serverAction = [];
    this.server = undefined;
  };
};

module.exports = FakeServer;