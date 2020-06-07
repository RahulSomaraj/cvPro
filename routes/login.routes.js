const express = require('express');
const router = express.Router();
const loginService = require('../services/login.service')
const path = require('path');

router.use(express.json());

router.post('/login',(request,response)=>{
    loginService.login(JSON.parse(JSON.stringify(request.body))).then((data)=>{
        console.log("saved")
        if(!!data){
            response.render(path.join(__dirname,'../public/JobHunt/candidates_dashboard.ejs'),{data :data})
        }
    })
    .catch((err)=>{
        console.log(err)
        response.send(err);
    })
});

router.get('/logout',(request,response)=>{
    response.redirect('/');
});

module.exports =  router;