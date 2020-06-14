const express = require('express');
const router = express.Router();
const loginService = require('../services/login.service')
const userService = require('../services/user.service')
const path = require('path');
const mailer = require('../services/nodemailer')
const UserModel = require('../models/User');
let bcrypt = require("bcrypt");


router.use(express.json());


async function get_context_data(request, response) {
    var { userId } = request.session
    console.log(request.session)
    console.log(userId)
    let user =  await userService.findOne({_id : request.session.userId})
    if (!user) {
        response.redirect('/');
        return null;
    }
    return user
}


router.get('/', async (request, response) => {
    let data =  await userService.findOne({_id : request.session.userId})

    var responsetoclient={
        loginstatus : data ? data: false,
        forgotPassword : false
    }
    if (data){
        request.session.userId = data._id;
        if(data.userType === '1'){
            response.redirect('candidate/dashboard');
        }else{
            response.redirect('employer/dashboard');
        }
        return null;
    }
    response.render(__dirname + '/../public/Jobhunt/index.ejs', {
        data : {...responsetoclient},
        request : request,
        response : response
    });
});

router.post('/login',async (request,response)=>{

    console.log(JSON.parse(JSON.stringify(request.body)))

    loginService.login(JSON.parse(JSON.stringify(request.body))).then((data)=>{
        if(!!data && !!Object.keys(data).length){
            request.session.userId = data._id;
            console.log(data)
            if(data.userType === '1'){
                response.redirect('candidate/dashboard');
            }else{
                response.redirect('employer/dashboard');
            }
        }else{
            response.render(path.join(__dirname,'../public/Jobhunt/index.ejs'),{data :data})
        }
    })
    .catch((err)=>{
        console.log(err);
        response.render(path.join(__dirname,'../public/Jobhunt/index.ejs', {data :null}));
    })
});

router.post('/forgotPassword', (request, response)=>{
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
    request.session.destroy();
    response.redirect('/');
});

module.exports =  router;