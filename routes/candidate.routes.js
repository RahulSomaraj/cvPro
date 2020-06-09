const express = require('express');
const router = express.Router();
const candidateServcie = require('../services/candidate.service');
const userService = require('../services/user.service');
const path = require('path');

router.use(express.json());

var data ;

router.get('/profile',(request,response)=>{
    console.log(request.cookies['userId']);
    response.render(path.join(__dirname,'../public/JobHunt/candidates_profile.ejs'),{data : data});
});
router.get('/dashboard',async (request,response)=>{
    data = await userService.findOne({_id : request.cookies['userId']})
    console.log(request.cookies['userId']);
    console.log(JSON.stringify(data));
    response.render(path.join(__dirname,'../public/JobHunt/candidates_dashboard'),{data : data});
});
router.get('/change_password',(request,response)=>{
    response.render(path.join(__dirname,'../public/JobHunt/candidates_change_password.ejs'),{data : data});
});
router.get('/myresume',(request,response)=>{
    response.render(path.join(__dirname,'../public/JobHunt/candidates_my_resume.ejs'),{data : data});
});
router.get('/shortList',(request,response)=>{
    response.render(path.join(__dirname,'../public/JobHunt/candidates_shortlist.ejs'),{data : data});
});
router.get('/appliedJobs',(request,response)=>{
    response.render(path.join(__dirname,'../public/JobHunt/candidates_applied_jobs.ejs'),{data : data});
});
router.get('/jobAlert',(request,response)=>{
    response.render(path.join(__dirname,'../public/JobHunt/candidates_job_alert.ejs'),{data : data});
});
router.get('/coverLetter',(request,response)=>{
    response.render(path.join(__dirname,'../public/JobHunt/candidates_cv_cover_letter.ejs'),{data : data});
});
router.get('/single',(request,response)=>{
    response.render(path.join(__dirname,'../public/JobHunt/candidates_single.ejs'),{data : data});
});





router.post('/updatecandidate',(request,response)=>{
    console.log(request.cookies['userId']);
    var obj = JSON.parse(JSON.stringify(request.body))
    Object.keys(obj).forEach(key => (obj[key] !== "" ||obj[key]) ? obj[key] = obj[key] : delete obj[key] );
    userService.update({_id : request.cookies['userId'],...obj}).then((data)=>{
        console.log("saved");
        console.log(data)
        response.render(path.join(__dirname,'../public/JobHunt/candidates_profile.ejs'),{data:data});
    }).catch((err)=>{
        console.log(err);
    })
});


module.exports =  router;