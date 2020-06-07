const express = require('express');
const router = express.Router();


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


router.get('/list',(request,response)=>{
    response.send('find Page');
});


router.get('/find/:id',(request,response)=>{
    console.log(request.params);
    response.send('findone Page');
});


router.put('/edit/:id',(request,response)=>{
    console.log(request.body);
    response.send('update Page');
});

router.get('/logout',(request,response)=>{
    response.send('logout Page');
});

module.exports =  router;