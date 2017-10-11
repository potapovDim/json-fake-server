const http = require('http');
const https = require('https');
const URL = require('url');

const {
  formResult,
  parseJson,
  killServer,
  getCurrentAction,
  stringifyJson,
  assertResponse,
  assertUrl,
} = require('./util');
const deepEqual = require('./equalObj');

const initialRequestHttp = http.request;
const initialRequestHttps = https.request;

const formActions = (method, actions, path, response, ...args) => {
  const FULL_URL = URL.parse(path);
  const [errorResponse = { body: 'api.notfound' }, assertRequestBody = false, requestBody = {}] = args;
  actions.push({
    called: false,
    assertRequest: assertRequestBody,
    calledArgs: [],
    callCount: 0,
    method: method,
    requestBody: requestBody,
    errorResponse: errorResponse,
    calledWithArg: function (arg) {
      let called = false
      this.calledArgs.forEach(argItem => {
        if(deepEqual(arg, argItem)) {
          called = true
        }
      })
      return called;
    },
    path,
    url: FULL_URL.hostname,
    realPath: FULL_URL.path,
    parsedPath: FULL_URL.hostname ? '/' + FULL_URL.hostname.replace('.', '/') + '/'+ FULL_URL.protocol.replace(':', '') : undefined,
    response: assertResponse(response)
  });
  return actions;
};

const methodEnum = ['POST', 'GET', 'PUT', 'DELETE'];

const formResponse = (
  response,
  serverActions,
  method,
  pathname,
  requestBody,
  responseFormat
) => {
  if (!methodEnum.includes(method)) {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.write(stringifyJson({ body: 'method.not.support' }));
  };
  let currentAction;
  if (responseFormat == 'text') {
    serverActions.forEach((handler) => {
      if (handler.method == method && handler.path == pathname) {
        handler.called = true;
        handler.callCount++;
        !(method == 'GET') && handler.calledArgs.push(requestBody);
        currentAction = handler;
      };
    });
    if (currentAction) {
      try {
        if (currentAction.assertRequest) {
          const equal = deepEqual(requestBody, currentAction.requestBody);
          if (equal) {
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.write(stringifyJson(currentAction.response));
          } else {
            response.writeHead(400, { 'Content-Type': 'text/plain' });
            response.write(stringifyJson(currentAction.errorResponse));
          }
        } else {
          response.writeHead(200, { 'Content-Type': 'text/plain' });
          response.write(stringifyJson(currentAction.response));
        }
      } catch (e) {
        console.error('when forma text response should be a string');
      }
    } else {
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.write(stringifyJson(currentAction.errorResponse));
    };
  } else {
    serverActions.forEach((handler) => {
      if (handler.parsedPath && handler.method == method && pathname == handler.parsedPath) {
        handler.called = true;
        handler.callCount++;
        !(method == 'GET') && handler.calledArgs.push(requestBody);
        currentAction = handler;
      } else if (handler.method == method && handler.path == pathname) {
        handler.called = true;
        handler.callCount++;
        !(method == 'GET') && handler.calledArgs.push(requestBody);
        currentAction = handler;
      };
    });
    if (currentAction) {
      if (currentAction.assertRequest) {
        const equal = deepEqual(requestBody, currentAction.requestBody);
        if (equal) {
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.write(stringifyJson(currentAction.response))
        } else {
          response.writeHead(400, { 'Content-Type': 'application/json' });
          response.write(stringifyJson(currentAction.errorResponse));
        }
      } else {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(stringifyJson(currentAction.response));
      }
    } else {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.write(stringifyJson({ error: 'api.notfound' }));
    };
  };
};

class FakeServer {
  constructor(port, responseFormat) {
    this.port = port || 4000;
    this.responseFormat = responseFormat || 'json';
    this.server = undefined;
    this.runned = false;
    this.serverActions = [];
  }
  getPostResult(path) {
    return getCurrentAction(path, 'POST', this.serverActions);
  };
  getGetResult(path) {
    return getCurrentAction(path, 'GET', this.serverActions);
  };
  getPutResult(path) {
    return getCurrentAction(path, 'PUT', this.serverActions);
  };
  getDelResult(path) {
    return getCurrentAction(path, 'DELETE', this.serverActions);
  };
  put(path, response, ...args) {
    this.serverAction = formActions('PUT', this.serverActions, path, response, ...args);
  };
  post(path, response, ...args) {
    this.serverAction = formActions('POST', this.serverActions, path, response, ...args);
  };
  get(path, response, ...args) {
    this.serverAction = formActions('GET', this.serverActions, path, response, ...args);
  };
  del(path, response, ...args) {
    this.serverAction = formActions('DELETE', this.serverActions, path, response, ...args);
  };
  start() {
    this.runned = true;

    const annotherUrlAction = this.serverActions.filter((action) => typeof action.url == 'string')
    this.server = http.createServer((request, response) => {
      let requestBody = ''
      const url = URL.parse(request.url);
      const METHOD = request.method;
      const pathname = url.pathname;
      request.on('data', (chunk) => {
        requestBody += chunk.toString('utf8');
      }).on('end', () => {
        try {
          requestBody = parseJson(requestBody);
          formResponse(response, this.serverActions, METHOD, pathname, requestBody, this.responseFormat);
          response.end();
        } catch (error) {
          console.error(error);
        }
      });

    }).listen(this.port
      ? this.port
      : 4000);
    const mockRequest = () => {
      https.request = ((request) => (opts, ...args) => {
        const currentAction = annotherUrlAction.filter((action) => {
          return (action.url + action.realPath) == (opts.hostname + opts.path)
        })[0]
        if (currentAction && (currentAction.method == opts.method)) {
          opts.port = this.port;
          opts.hostname = 'localhost';
          opts.url = `http://localhost:${this.port || 4000}`;
          opts.path = currentAction.parsedPath;
          opts.protocol = 'http:';
          return request(opts, ...args);
        };
        return initialRequestHttps(opts, ...args)
      })(http.request.bind(http.request));
    };
    mockRequest()
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
    http.request = initialRequestHttp;
    https.request = initialRequestHttps;
  };
};

module.exports = FakeServer;
