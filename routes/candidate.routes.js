
const express = require('express');
const router = express.Router();
const candidateServcie = require('../services/candidate.service');
const userService = require('../services/user.service');
const path = require('path');
const resumeService =  require("../services/resume.service");
const mailer = require('../services/nodemailer');
router.use(express.json());

var resume = require(JSON.parse(JSON.stringify('../resume.json')));


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


/*
router.get('/list', async (request,response) => {
    var data = await get_context_data(request);
    response.render(path.join(__dirname,'../public/JobHunt/candidates_list.ejs'), {data : {...data,resume:{...resume}}});
});
*/

router.get('/single', async (request,response) => {
    var data = await get_context_data(request, response);
    if (data){
        var resume_ = await resumeService.findOne({candidateId:data._id});
        data.resume = resume_;
        response.render(path.join(__dirname,'../public/JobHunt/candidates_single.ejs'), {data : {...data,resume:{...resume}}});
    }
});


router.get('/profile', async (request,response) => {
    console.log(request.session.userId);
    var data = await get_context_data(request, response);
    if (data){
        response.render(path.join(__dirname,'../public/JobHunt/candidates_profile.ejs'), {data : data,resume:{...resume}});
    }
});

router.get('/dashboard',async (request,response) => {
    console.log("session in dashborad");
    var {userId} = request.session
    var data = await get_context_data(request, response);
    if (data){
        response.render(path.join(__dirname,'../public/JobHunt/candidates_dashboard'), {data : data});
    }
});

router.get('/change_password', async (request, response) => {
    var data = await get_context_data(request, response);
    if (data){
        response.render(path.join(__dirname,'../public/JobHunt/candidates_change_password.ejs'), {data : data});
    }
});

router.get('/myresume', async (request, response) => {
    var data = await get_context_data(request, response);
    if (data) {
        var resume_ = await resumeService.findOne({candidateId:data._id});
        data.resume = JSON.stringify(resume_.toJSON());
        response.render(path.join(__dirname,'../public/JobHunt/candidates_my_resume.ejs'), {data : data});
    }
});

router.get('/shortList', async (request,response) => {
    var data = await get_context_data(request, response);
    response.render(path.join(__dirname,'../public/JobHunt/candidates_shortlist.ejs'), {data : data});
});

router.get('/appliedJobs', async (request,response) => {
    var data = await get_context_data(request, response);
    if (data) {
        response.render(path.join(__dirname, '../public/JobHunt/candidates_applied_jobs.ejs'), {data: data});
    }
});

router.get('/jobAlert', async (request, response) => {
    var data = await get_context_data(request, response);
    if (data) {
        response.render(path.join(__dirname, '../public/JobHunt/candidates_job_alert.ejs'), {data: data});
    }
});

router.get('/coverLetter', async (request,response) => {
    var data = await get_context_data(request, response);
    if (data) {
        response.render(path.join(__dirname, '../public/JobHunt/candidates_cv_cover_letter.ejs'), {data: data});
    }
});

router.get('/downloadresume', async (request,response) => {
    response.download(path.join(__dirname,'resume.pdf'));
    response.redirect("/single");
});

router.get('/mailAction', async (request, response) => {
    var data = await get_context_data(request,response);
    mailer.mail(JSON.parse(JSON.stringify(request.body)))
    response.redirect("/single");
});

router.post('/updatecandidate', async  (request, response)=>{
    var obj = JSON.parse(JSON.stringify(request.body))
    Object.keys(obj).forEach(key => (obj[key] !== "" ||obj[key]) ? obj[key] = obj[key] : delete obj[key] );
    userService.update({_id : request.session.userId,...obj}).then((data)=>{
        console.log(data)
        response.render(path.join(__dirname,'../public/JobHunt/candidates_profile.ejs'),{data:data});
    }).catch((err)=>{
        console.log(err);
    })
});


router.post('/updateCandidateProfile', async (request,response) => {
    var data = await get_context_data(request, response);
    var obj = JSON.parse(JSON.stringify(request.body))
});


module.exports =  router;



