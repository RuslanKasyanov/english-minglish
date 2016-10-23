var koa = require('koa');
var compose = require('koa-compose');
var Pug = require('koa-pug');
var path = require('path');
var Router = require('koa-router');

//our modules
var routes = require('./routes');
var config = require('./libs/config');
var db = require('./libs/mongoose');

var app = koa();
var router = new Router();

/**
 * statics must be given to the frontend(~nginx) || it is just for simple develop
 */
var staticDir = path.resolve(__dirname, 'public');

/**
 * require handlers
 */
var handlers = {
    home: require('./handlers/home'),
    users: require('./handlers/users')
};

//associate handlers with router
routes.setup(router, handlers);
app.use(router.routes()).use(router.allowedMethods());

/**
 * init all models
 */
db.init(path.join(__dirname, "models"));

/**
 * locals - it is constant variable for template(html/pug) page
 */
var pug = new Pug({
    viewPath: path.resolve(__dirname, 'front/views'),
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
    var method = this.request.method;
    if (method == 'POST') {
        // => POST body
        this.body = JSON.stringify(this.request.body);
    }
    yield next;
});

/**
 * Intercept 404 errors TODO
 */
app.use(function *pageNotFound(next){
    yield next;

    if (404 != this.status) {
        return yield next;
    }

    this.status = 404;

    switch (this.accepts('html', 'json')) {
        case 'html':
            //todo need render to page 404
            this.type = 'html';
            this.body = '<p>Page Not Found</p>';
            break;
        case 'json':
            //todo need handle as error i think
            this.body = {
                message: 'Page Not Found'
            };
            break;
        default:
            this.type = 'text';
            this.body = 'Page Not Found';
    }
});

module.exports = app;
