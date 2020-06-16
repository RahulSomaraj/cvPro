
const express = require('express');
const router = express.Router();
const candidateServcie = require('../services/candidate.service');
const userService = require('../services/user.service');
const path = require('path');
const resumeService =  require("../services/resume.service");
const mailer = require('../services/nodemailer');
const bcrypt = require('bcrypt');
router.use(express.json());

var resume = require(JSON.parse(JSON.stringify('../resume.json')));


async function get_context_data(request, response) {
    let { userId } = request.session
    console.log(request.session)
    console.log(userId)
    let user =  await userService.findOne({_id : request.session.userId})
    if (!user) {
        response.redirect('/');
        return null;
    }
    return user
}


/*
router.get('/list', async (request,response) => {
    var data = await get_context_data(request);
    response.render(path.join(__dirname,'../public/JobHunt/candidates_list.ejs'), {data : {...data,resume:{...resume}}});
});
*/

router.get('/single', async (request,response) => {
    let data = await get_context_data(request, response);
    if (data){
        let resume_ = await resumeService.findOne({candidateId:data._id});
        data.resume = JSON.stringify(resume_.toJSON());
        response.render(path.join(__dirname,'../public/JobHunt/candidates_single.ejs'), {data : {...data,resume:{...resume}}});
    }
});


router.get('/profile', async (request,response) => {
    console.log(request.session.userId);
    let data = await get_context_data(request, response);
    if (data){
        response.render(path.join(__dirname,'../public/JobHunt/candidates_profile.ejs'), {data : data,resume:{...resume}});
    }
});

router.get('/dashboard',async (request,response) => {
    console.log("session in dashborad");
    let {userId} = request.session
    let data = await get_context_data(request, response);
    if (data){
        response.render(path.join(__dirname,'../public/JobHunt/candidates_dashboard'), {data : data});
    }
});

router.get('/change_password', async (request, response) => {
    let data = await get_context_data(request, response);
    if (data){
        response.render(path.join(__dirname,'../public/JobHunt/candidates_change_password.ejs'), {data : data});
    }
});


router.post('/updatecustomerPassword', async (request, response) => {
    console.log("request reached heres")
    var data = await get_context_data(request, response);
    if (data){
        let incoming = JSON.parse(JSON.stringify(request.body));
        if(incoming.newPassword == incoming.confirmPassword){
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




router.get('/myresume', async (request, response) => {
    let data = await get_context_data(request, response);
    if (data) {
        let resume_ = await resumeService.findOne({candidateId:data._id});
        data.resume = JSON.stringify(resume_.toJSON());
        response.render(path.join(__dirname,'../public/JobHunt/candidates_my_resume.ejs'), {data : data});
    }
});

router.get('/shortList', async (request,response) => {
    let data = await get_context_data(request, response);
    response.render(path.join(__dirname,'../public/JobHunt/candidates_shortlist.ejs'), {data : data});
});

router.get('/appliedJobs', async (request,response) => {
    let data = await get_context_data(request, response);
    if (data) {
        response.render(path.join(__dirname, '../public/JobHunt/candidates_applied_jobs.ejs'), {data: data});
    }
});

router.get('/jobAlert', async (request, response) => {
    let data = await get_context_data(request, response);
    if (data) {
        response.render(path.join(__dirname, '../public/JobHunt/candidates_job_alert.ejs'), {data: data});
    }
});

router.get('/coverLetter', async (request,response) => {
    let data = await get_context_data(request, response);
    if (data) {
        response.render(path.join(__dirname, '../public/JobHunt/candidates_cv_cover_letter.ejs'), {data: data});
    }
});

router.get('/downloadresume', async (request,response) => {
    response.download(path.join(__dirname,'resume.pdf'));
    response.redirect("/single");
});

router.get('/mailAction', async (request, response) => {
    let data = await get_context_data(request,response);
    mailer.mail(JSON.parse(JSON.stringify(request.body)))
    response.redirect("/single");
});

router.post('/updatecandidate', async  (request, response)=>{
    let obj = JSON.parse(JSON.stringify(request.body))
    Object.keys(obj).forEach(key => (obj[key] !== "" ||obj[key]) ? obj[key] = obj[key] : delete obj[key] );
    userService.update({_id : request.session.userId,...obj}).then((data)=>{
        console.log(data)
        response.render(path.join(__dirname,'../public/JobHunt/candidates_profile.ejs'),{data:data});
    }).catch((err)=>{
        console.log(err);
    })
});


router.post('/updateCandidateProfile', async (request,response) => {
    let obj = JSON.parse(JSON.stringify(request.body));
    console.log(obj);
    response.send('{ "status": "done" }');
});


module.exports =  router;



