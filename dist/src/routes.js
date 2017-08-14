"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = [];
exports.createSingleRoute = function (pathOrRegex, method, response, condition, responseError) {
    exports.routes.push({ method: method, pathOrRegex: pathOrRegex, condition: condition, response: response, responseError: responseError });
};
exports.ceateManyRoutes = function () {
    var routerEmitter = {
        add: function (method, pathOrRegex, response, condition, responseError) {
            exports.routes.push({ method: method, pathOrRegex: pathOrRegex, response: response, condition: condition, responseError: responseError });
            return routerEmitter;
        }
    };
    return routerEmitter;
};
//# sourceMappingURL=routes.js.map