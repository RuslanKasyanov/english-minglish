var Router = require('koa-router');
var router = new Router();

function loadRoutes(obj, routes) {
    routes.forEach(function (val) {
        var method = val.method.toLowerCase();
        var func;
        switch (method) {
            case 'get':
                func = obj.get;
                break;
            case 'post':
                func = obj.post;
                break;
            case 'all':
                func = obj.all;
                break;
            default:
                func = obj.get;
                break;
        }
        return func.call(obj, val.name, val.url, val.middleware)
    });
}

/**
 * this connect routers
 */
loadRoutes(router, require('./../routes/home').routes);
loadRoutes(router, require('./../routes/user').routes);

module.exports = router;