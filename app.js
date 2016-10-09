var koa = require('koa');
var compose = require('koa-compose');
var Pug = require('koa-pug');
var path = require('path');
var routes = require('./bin/handlers');
var db = require('./mongoose');
var app = koa();

/**
 * statics must be given to the frontend(~nginx) || it is just for simple develop
 */
var staticDir = path.resolve(__dirname, 'public');

/**
 * locals - it is constant variable for template(html/pug) page
 */
var pug = new Pug({
    viewPath: path.resolve(__dirname, 'views'),
    debug: true,
    locals: {
        page_title: 'so, it is minglish',
        repo: 'https://github.com/RuslanKasyanov/einglish-minglish',
        team: 'minglish',
        copyright: 'Minglish'
    },
    app: app
});

var middlewareStack = [
    require('koa-session')([], app),
    require('koa-logger')(),
    require('koa-static')(staticDir),
    require('koa-body')({formidable: {uploadDir: __dirname}})
];

require('koa-locals')(app);

app.use(compose(middlewareStack));

app.use(function *(next) {
    if (this.request.method == 'POST') {
        // => POST body
        this.body = JSON.stringify(this.request.body);
    }
    yield next;
});

app.use(function*(next) {
    this.locals.url = function (url, params) {
        return routes.url(url, params);
    };
    yield next
});

app.use(routes.middleware());

module.exports = app;
