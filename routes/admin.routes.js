const express = require('express');
const router = express.Router();
const loginService = require('../services/login.service')
const userService = require('../services/user.service')
const path = require('path');
const mailer = require('../services/nodemailer')
const UserModel = require('../models/User');
let bcrypt = require("bcrypt");


const candidate_views = require('./admin_views/candidates');
const employer_views = require('./admin_views/employers');
const category_views = require('./admin_views/categories');


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


router.get('/dashboard/', async (request, response) => {
    let responsetoclient = {}
    response.render(__dirname + '/../public/Jobhunt/admin_views/dashboard.ejs', {
        data : {...responsetoclient},
        request : request,
        response : response
    });
});


router.get ('/candidates/', candidate_views.list);
router.get ('/candidates/add/', candidate_views.form_render);
router.post('/candidates/add/', candidate_views.form_api);
router.get ('/candidates/user-:id/', candidate_views.form_render);
router.post('/candidates/user-:id/', candidate_views.form_api);
router.post('/candidates/user-:id/delete', candidate_views.delete_object_and_redirect);

router.get ('/employers/', employer_views.list);
router.get ('/employers/add/', employer_views.form_render);
router.post('/employers/add/', employer_views.form_api);
router.get ('/employers/user-:id/', employer_views.form_render);
router.post('/employers/user-:id/', employer_views.form_api);
router.post('/employers/user-:id/delete', employer_views.delete_object_and_redirect);


router.get ('/categories/', category_views.list);
router.get ('/categories/add/', category_views.form_render);
router.post('/categories/add/', category_views.form_api);
router.get ('/categories/user-:id/', category_views.form_render);
router.post('/categories/user-:id/', category_views.form_api);
router.post('/categories/user-:id/delete', category_views.delete_object_and_redirect);



router.get('/jobs/', );


router.post('/updatePassword/', async (request, response) => {
    console.log("request reached heres")
    var data = await get_context_data(request, response);
    if (data){
        let incoming = JSON.parse(JSON.stringify(request.body));
        if(incoming.newPassword === incoming.confirmPassword){
            let datafound = await userService.findOne({_id : request.session.userId})
            if(datafound){
                if(bcrypt.compareSync(incoming.oldPassword,datafound.password)){
                    datafound.password = incoming.newPassword
                    const hash = bcrypt.hashSync(datafound.password, 10);
                    datafound.password = hash;
                    userService.update(datafound).then((data)=>{
                        response.render(path.join(__dirname,'../public/JobHunt/candidates_change_password.ejs'), {data : data});
                    })
                        .catch((err)=>{
                            console.log(err)
                            response.render(path.join(__dirname,'../public/JobHunt/candidates_change_password.ejs'), {data : data});
                        })
                }else{
                    response.render(path.join(__dirname,'../public/JobHunt/candidates_change_password.ejs'), {data : data});
                }
            }
        }
        // response.render(path.join(__dirname,'../public/JobHunt/candidates_change_password.ejs'), {data : data});
    }
});

router.get('/logout', (request,response)=>{
    console.log("logout")
    request.session.destroy();
    response.redirect('/');
});

module.exports =  router;
