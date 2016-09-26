function* get() {
    this.render('index', {
        Hello: 'World',
        method: 'get'
    })
}

function* post() {
    this.render('index', {
        Hello: 'World',
        method: 'post'
    })
}

var routes = [
    {method: 'get', name: 'index', url: '/', middleware: get},
    {method: 'post', name: 'index', url: '/', middleware: post}
];

exports.routes = routes;