const express = require('express');
const router = express.Router();
const candidateServcie = require('../services/candidate.service');
const userService = require('../services/user.service');
const path = require('path');

router.use(express.json());

router.get('/profile',(request,response)=>{
    console.log(request.cookies['userId']);
    response.render(path.join(__dirname,'../public/JobHunt/candidates_profile.ejs'));
});
router.get('/change_password',(request,response)=>{
    response.render(path.join(__dirname,'../public/JobHunt/candidates_change_password.ejs'));
});
router.get('/myresume',(request,response)=>{
    response.render(path.join(__dirname,'../public/JobHunt/candidates_my_resume.ejs'));
});
router.get('/shortList',(request,response)=>{
    response.render(path.join(__dirname,'../public/JobHunt/candidates_shortlist.ejs'));
});
router.get('/appliedJobs',(request,response)=>{
    response.render(path.join(__dirname,'../public/JobHunt/candidates_applied_jobs.ejs'));
});
router.get('/jobAlert',(request,response)=>{
    response.render(path.join(__dirname,'../public/JobHunt/candidates_job_alert.ejs'));
});
router.get('/coverLetter',(request,response)=>{
    response.render(path.join(__dirname,'../public/JobHunt/candidates_cv_cover_letter.ejs'));
});






router.post('/updatecandidate',(request,response)=>{
    console.log(request.cookies['userId']);
    userService.update({_id : request.cookies['userId'],...JSON.parse(JSON.stringify(request.body))}).then((data)=>{
        console.log("savde");
        console.log(data)
        response.render(path.join(__dirname,'../public/JobHunt/candidates_profile.ejs'));
    }).catch((err)=>{
        console.log(err);
    })
});


module.exports =  router;