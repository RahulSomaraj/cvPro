const express = require('express');
const router = express.Router();
const loginService = require('../services/login.service')

router.use(express.json());

router.post('/login',(request,response)=>{
    loginService.login(request.body).then((data)=>{
        if(!!data){
            response.send(data)
        }
    })
    .catch((err)=>{
        response.send(err);
    })
});

router.get('/logout',(request,response)=>{
    response.send('logout Page');
});

module.exports =  router;