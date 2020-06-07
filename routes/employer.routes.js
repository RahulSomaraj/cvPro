const express = require('express');
const router = express.Router();


const employerService = require('../services/employer.service');


router.use(express.json());

router.get('/',(request,response)=>{
    employerService.find({}).then((data)=>{
        response.send(data);
    })
    .catch((err)=>{
        response.send(err);
    })
    response.send('Candidate Page');
});

router.post('/save',(request,response)=>{
    employerService.create(request.body).then((data)=>{
        response.send(data);
    })
    .catch((err)=>{
        response.send(data);
    })
    response.send('save Page');
});


router.get('/find/:id',(request,response)=>{
    employerService.findOne(request.params)
        .then((data)=>{
            response.send(data);
        })
        .catch((err)=>{
            response.send(err);
        })
});


router.put('/edit/:id',(request,response)=>{
    employerService.update(request.params)
    .then((data)=>{
        response.send(data);
    })
    .catch((err)=>{
        response.send(err);
    })    
});



module.exports =  router;