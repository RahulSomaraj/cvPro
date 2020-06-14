const checkSession = function(request,response,next){
    if(!request.session){
        response.redirect("/");
    }    
    next();
}

module.exports =  checkSession