const express = require('express');
const router = express.Router();
const loginService = require('../services/login.service')
const userService = require('../services/user.service')
const path = require('path');
const mailer = require('../services/nodemailer')
const UserModel = require('../models/User');
let bcrypt = require("bcrypt");


router.use(express.json());

router.post('/login',async (request,response)=>{
    loginService.login(JSON.parse(JSON.stringify(request.body))).then((data)=>{
        if(!!data && !!Object.keys(data).length){
            request.session.userId = data._id;
            response.redirect('candidate/dashboard');
            // response.render(path.join(__dirname,'../public/Jobhunt/candidates_dashboard.ejs'),{data : {responsetoclient,...JSON.parse(JSON.stringify(data))}})
        }else{
            response.render(path.join(__dirname,'../public/Jobhunt/index.ejs'),{data :responsetoclient})        
        }
    })
    .catch((err)=>{
        console.log(err);
        response.render(path.join(__dirname,'../public/Jobhunt/index.ejs'),{data :responsetoclient});
    })
});

router.post('/forgotPassword',(request,response)=>{
    var data = {
        forgotPassword : true
    }
    var values = Math.floor(Math.random() * 10000);
    console.log(values)

    var emailData = {
        to : request.body.email,
        text : `your new password is ${values}` ,
        subject : "password change initiated",
        html : `<b>your new password is ${values}</b>`
    }

    values = bcrypt.hashSync(values.toString(), 10);
    console.log(values)

    UserModel.findOneAndUpdate({email : request.body.email},  {$set: {password : values}}, {useFindAndModify: false}).then((data)=>{
        mailer.mail(emailData);
    })
    .catch((err)=>{
        console.log(err);
    })
    response.render(path.join(__dirname , '../public/Jobhunt/index'),{data : data });

});

router.get('/logout', (request,response)=>{
    console.log("logout")
    response.clearCookie('userId');
    response.redirect('/');
});

module.exports =  router;