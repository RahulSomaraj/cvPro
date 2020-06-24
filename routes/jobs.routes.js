const express = require('express');
const router = express.Router();
const userService = require('../services/user.service')
const path = require('path');

router.use(express.json());

router.get('/',(request,response)=>{
    fs.readFile('../public/jobpply/index.html', function(err, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        return response.end();
    })
    response.send()
});

router.post('/save',(request,response)=>{
    response.send('save jobs Page');
});


router.get('/list', (request,response)=>{
    response.render(path.join(__dirname, '../public/JobHunt/job_list_classic.ejs'), {data : {...data,resume:{...resume}}});
});


router.get('/:id',(request,response)=>{
    response.render(path.join(__dirname, '../public/JobHunt/job_single2.ejs'), {data : {...data,resume:{...resume}}});
});


router.put('/edit/:id',(request,response)=>{
    console.log(request.body);
    response.send('update Page');
});

router.get('/logout',(request,response)=>{
    response.send('logout Page');
});



router.get('/appliedJobs',(request,response)=>{
    jobService.find({})
})
module.exports =  router;