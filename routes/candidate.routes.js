const express = require('express');
const router = express.Router();
const candidateServcie = require('../services/candidate.service');
const path = require('path');

router.use(express.json());

router.get('/',(request,response)=>{
    candidateServcie.find({}).then((data)=>{
        response.send(data);
    })
    .catch((err)=>{
        response.send(err);
    })
    response.send('Candidate Page');
});



router.get('/profile',(request,response)=>{
    response.render(path.join(__dirname,'../public/JobHunt/candidates_profile.ejs'));
});



router.post('/save',(request,response)=>{
    candidateServcie.create(request.body).then((data)=>{
        response.send(data);
    })
    .catch((err)=>{
        response.send(data);
    })
    response.send('save Page');
});


router.get('/find/:id',(request,response)=>{
    candidateServcie.findOne(request.params)
        .then((data)=>{
            response.send(data);
        })
        .catch((err)=>{
            response.send(err);
        })
});


router.put('/edit/:id',(request,response)=>{
    candidateServcie.update(request.params)
    .then((data)=>{
        response.send(data);
    })
    .catch((err)=>{
        response.send(err);
    })    
});



module.exports =  router;