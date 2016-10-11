module.exports.setup = function(router, handlers){
    //Main
    router
        .get('/', handlers.home);
    //User
    router
        .get('/users', handlers.users.list)
        .get('/users/:id', handlers.users.get)
        .post('/users', handlers.users.create)
        .put('/users/:id', handlers.users.update)
        .delete('/users/:id', handlers.users.remove);
    //TODO
};