const express = require('express');
const router = express.Router();
const employerService = require('../services/employer.service');
router.use(express.json());
const userService = require('../services/user.service');
const path = require('path');
let resume = {};

async function get_context_data(request) {
    return await userService.findOne({_id : request.session.userId})
}

router.get('/list', async (request, response) => {
    var data = await get_context_data(request);
    response.render(path.join(__dirname,'../public/JobHunt/employer_list.ejs'), {data : {...data, resume:{...resume}}});
});

router.get('/profile', async (request, response) => {
    var data = await get_context_data(request);
    response.render(path.join(__dirname,'../public/JobHunt/employer_profile.ejs'), {data : {...data, resume:{...resume}}});
});

router.get('/manage-jobs', async (request, response) => {
    var data = await get_context_data(request);
    response.render(path.join(__dirname,'../public/JobHunt/employer_manage_jobs.ejs'), {data : {...data, resume:{...resume}}});
});

router.get('/resume', async (request,response) => {
    var data = await get_context_data(request);
    response.render(path.join(__dirname,'../public/JobHunt/employer_resume.ejs'), {data : {...data, resume:{...resume}}});
});


router.get('post-job', async (request,response) => {
    var data = await get_context_data(request);
    response.render(path.join(__dirname,'../public/JobHunt/employer_post_job.ejs'), {data : {...data, resume:{...resume}}});
});

router.get('/change_password', async (request,response) => {
    var data = await get_context_data(request);
    response.render(path.join(__dirname,'../public/JobHunt/employer_change_password.ejs'), {data : data});
});


module.exports =  router;


