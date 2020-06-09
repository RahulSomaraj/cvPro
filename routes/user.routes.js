const express = require('express');
const router = express.Router();
const candidateServcie = require('../services/user.service');

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

router.post('/save',(request,response)=>{
    console.log(JSON.stringify(request.body));
    candidateServcie.create(JSON.parse(JSON.stringify(request.body))).then((data)=>{
        response.redirect('/');
    })
    .catch((err)=>{
        response.render(__dirname+"public/index.ejs");
    })
    // response.send('save Page');
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