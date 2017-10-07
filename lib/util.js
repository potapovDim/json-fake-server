const path = require('path');

const killServer = (server) => {
  let sockets = [];

  server.on('connection', function (socket) {
    sockets.push(socket);

    socket.once('close', function () {
      sockets.splice(sockets.indexOf(socket), 1);
    });
  });

  server.kill = function (cb) {
    server.close(cb);
    sockets.forEach(function (socket) {
      socket.destroy();
    });

    sockets = [];
  };

  return server;
};

const stringifyJson = (body) => {
  if (typeof body == 'string') {
    return body;
  }
  try {
    return JSON.stringify(body);
  } catch (error) {
    console.error('Can`t stringify this data');
  }
}

const parseJson = (body) => {
  try {
    return JSON.parse(body)
  } catch (error) {
    return null;
  };
};

const formResult = (action) => {
  const act = Object.assign({}, action);
  Reflect.deleteProperty(act, 'path');
  Reflect.deleteProperty(act, 'response');
  Reflect.deleteProperty(act, 'url');
  Reflect.deleteProperty(act, 'response');
  Reflect.deleteProperty(act, 'requestBody');
  Reflect.deleteProperty(act, 'errorResponse');
  Reflect.deleteProperty(act, 'url');
  Reflect.deleteProperty(act, 'realPath');
  Reflect.deleteProperty(act, 'parsedPath');
  return act;
};

const getCurrentAction = (path, method, actions) => {
  return actions.reduce((resultAction, action) => {
    if(action.method == method && action.path == path) {
      resultAction = action;
    }
    return resultAction;
  }, {});
};

const assertResponse = (response) => {
  if (typeof response == 'string') {
    const pathToResponse = path.resolve(process.cwd(), response);
    try {
      return require(pathToResponse);
    } catch (error) {
      console.error(error);
    };
  };
  return response;
};

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

const assertUrl = (urlObj) => {
  return urlObj.protocol && urlObj.host && urlObj.hostname
};

module.exports = {
  assertUrl,
  formResult,
  stringifyJson,
  assertResponse,
  parseJson,
  killServer,
  getCurrentAction
};