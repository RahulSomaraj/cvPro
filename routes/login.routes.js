const express = require('express');
const router = express.Router();
const loginService = require('../services/login.service')
const path = require('path');
const mailer = require('../services/nodemailer')
const UserModel = require('../models/User');
let bcrypt = require("bcrypt");


router.use(express.json());

router.post('/login',(request,response)=>{
    loginService.login(JSON.parse(JSON.stringify(request.body))).then((data)=>{
        console.log("saved")
        if(!!data){
            response.render(path.join(__dirname,'../public/Jobhunt/candidates_dashboard.ejs'),{data :data})
        }
    })
    .catch((err)=>{
        console.log(err)
        response.send(err);
    })
});

router.get('/forgotPassword',(request,response)=>{
    var data = {
        forgotPassword : true
    }
    var values = Math.floor(Math.random() * 10000);
    var emailData = {
        to : 'torahulsomaraj@gmail.com',
        text : `your new password is ${Math.floor(Math.random() * 10000)}` ,
        subject : "password change initiated",
        html : `<b>your new password is ${values}</b>`
    }

    UserModel.findOneAndUpdate({email : "torahulsomaraj@gmail.com"},  {$set: {password : bcrypt.hashSync(values, 10)}}, {useFindAndModify: false}).then((data)=>{
        mailer.mail(emailData);
    })
    .catch((err)=>{
        console.log(err);
    })
    response.render(path.join(__dirname , '../public/Jobhunt/index'),{data : data });

});

router.get('/logout',(request,response)=>{
    response.redirect('/');
});

module.exports =  router;