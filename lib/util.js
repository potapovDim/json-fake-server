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

const stringifyJson = body => {
  if (typeof body == 'string') {
    return body;
  }
  try {
    return JSON.stringify(body);
  } catch (error) {
    console.error('Can`t stringify this data');
  }
}

const parseJson = body => {
  try {
    return JSON.parse(body)
  } catch (error) {
    console.error(error.message)
    return null;
  };
};

const formResult = (action) => {
  const act = Object.assign({}, action);
  Reflect.deleteProperty(act, 'path');
  Reflect.deleteProperty(act, 'response');
  return act;
};

const getCurrentAction = (path, method, actions) => {
  const result = actions.filter(action => action.method == method && action.path == path);
  return result.length == 1 ? formResult(result[0]) : {};
};

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

module.exports = {
  formResult,
  stringifyJson,
  assertResponse,
  parseJson,
  killServer,
  getCurrentAction
};