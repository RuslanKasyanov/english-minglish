function* index() {
    yield this.render('home', {
        Hello: 'World',
        title: 'JUST'
    })
}

var routes = [
    {method: 'get', name: 'index', url: '/', middleware: index}
];

exports.routes = routes;