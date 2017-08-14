"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var koa2_1 = require("koa2");
var koa_bodyparser_1 = require("koa-bodyparser");
var koa_cors_1 = require("koa-cors");
var koa_logger_1 = require("koa-logger");
var koa_router_1 = require("koa-router");
var routes_1 = require("./routes");
var actions_1 = require("./actions");
var FakeServer = (function () {
    function FakeServer(port, logger) {
        this.logger = logger;
        this.port = port;
        this.router = new koa_router_1();
        this.routes = routes_1.routes;
        this.callCount = 0;
        this.called = false;
    }
    ;
    FakeServer.prototype.ceateManyRoutes = function () {
        routes_1.ceateManyRoutes();
        this.routes = routes_1.routes;
    };
    ;
    FakeServer.prototype.createSingleRoute = function (pathOrRegex, method, response, condition, responseError) {
        routes_1.createSingleRoute(pathOrRegex, method, response, condition, responseError);
        this.routes = routes_1.routes;
    };
    ;
    FakeServer.prototype.initializeRoutes = function () {
        var _this = this;
        this.routes.forEach(function (route) {
            if (route.method == 'POST') {
                _this.router.post(route.pathOrRegex, actions_1.fakePost(route.response, route.condition, route.responseError));
            }
            else {
                _this.router.get(route.pathOrRegex, actions_1.fakeGet(route.response, route.condition, route.responseError));
            }
        });
    };
    ;
    FakeServer.prototype.start = function () {
        var app = new koa2_1();
        app.use(koa_bodyparser_1());
        app.use(koa_cors_1());
        if (this.logger) {
            app.use(koa_logger_1());
        }
        ;
        app.use(this.router());
        app.listen(this.port);
        console.log('server start on port ' + this.port);
    };
    ;
    return FakeServer;
}());
exports.FakeServer = FakeServer;
;
// if(process.env.NODE_ENV='test'){
//   const logger = require('koa-logger')
//   app.use(logger())
// }
// ceateManyRoutes().add('lol', 'post', {}, {}, {}).add('lol', 'post', {}, {}, {})
// app.use(require('./routes')())
// const PORT = port || 4422
// app.listen(PORT)
//# sourceMappingURL=index.js.map