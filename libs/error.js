module.exports.redirect = function(ctx, message, error){
    ctx.render('error', {
        message: message,
        error: error
    });
    ctx.status = 500;
};