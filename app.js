var koa = require('koa');
var path = require('path');
var compose = require('koa-compose');

//TODO statics must be given to the frontend(~nginx) || it is just for simple develop
var staticDir = path.join(__dirname, '/public');
var viewsDir = path.join(__dirname, '/views');

var app = koa();

var middlewareStack = [
    require('koa-session')([], app),
    require('koa-logger')(),
    require('koa-static')(staticDir),
    require('koa-views')(viewsDir, {extension: 'jade'})
];

require('koa-locals')(app);

app.use(compose(middlewareStack));

var routes = require('./handlers');

app.use(function* (next) {
    this.locals.url = function (url, params) {
        return routes.url(url, params);
    };
    yield next
});

app.use(routes.middleware());

module.exports = app;
