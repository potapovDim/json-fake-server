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

module.exports = {
  formResult,
  parseJson,
  killServer,
  getCurrentAction
};