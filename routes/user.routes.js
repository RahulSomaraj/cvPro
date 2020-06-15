const express = require('express');
const router = express.Router();
const candidateServcie = require('../services/user.service');
const resumeService = require('../services/resume.service');
const auth = require("../middleware/auth")

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

router.post('/save',async (request,response)=>{
    console.log(JSON.stringify(request.body));

    var data = JSON.parse(JSON.stringify(request.body));
    var { email, userName, phone_number } = data;
    console.log(data)

    candidateServcie.create(JSON.parse(JSON.stringify(request.body))).then(async (data) => {
        await resumeService.create(data._id);
        response.redirect('/');
    })
    .catch((err)=>{
        if (err.name === 'MongoError' && err.code === 11000) {
        // Duplicate username
        return response.status(422).send({ succes: false, message: `User ${Object.keys(err.keyValue)} already exist!` });
      }
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


router.put('/edit/:id', ( request, response ) => {
    candidateServcie.update(request.params).then( (data) => {
        response.send(data);
    }).catch( (err) => {
        response.send(err);
    })    
});


module.exports =  router;