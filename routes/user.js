var User = require('./../models/user');

function* get(){
    this.render('user',{});

}
function* post(){
    var loginForm = this.request.body;
    var user = new User.userModel(loginForm);
    user.save(loginForm, function (err, user) {
        if (err) {
            return next(err);
        }
    });
    this.render('user',{
        login: user.login,
        pass: user.pass,
        saved: true
    });
}

var routes = [
    {method: 'get', name: 'user', url:'/user', middleware: get},
    {method: 'post', name: 'user', url:'/user', middleware: post}
];

exports.routes = routes;