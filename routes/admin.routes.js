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
    /*

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
    */
    let responsetoclient = {}
    response.render(__dirname + '/../public/Jobhunt/admin/dashboard.ejs', {
        data : {...responsetoclient},
        request : request,
        response : response
    });
});

router.get('/logout', (request,response)=>{
    console.log("logout")
    request.session.destroy();
    response.redirect('/');
});

module.exports =  router;