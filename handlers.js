//TODO must be transfer near server
var Router = require('koa-router');
var router = new Router();

function loadRoutes(obj, routes){
    routes.forEach(function(val){
        var func = val.method.toLowerCase() == 'get' ? obj.get :
            val.method.toLowerCase() == 'post' ? obj.post :
                val.method.toLowerCase() == 'all' ? obj.all : obj.get;
        return func.call(obj, val.name, val.url, val.middleware)
    });
}

//TODO this connect routers
loadRoutes(router, require('./routes/home').routes);

module.exports = router;