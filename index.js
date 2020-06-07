const express = require('express');
const fs = require('fs');

const db = require('./db/mongoose');
const bodyParser = require('body-parser');

db.connect();

//intalize routes 
const candidateRoutes = require('./routes/candidate.routes');
const employerRoutes = require('./routes/employer.routes');
const loginRoutes = require('./routes/login.routes');
const userRoutes = require('./routes/user.routes');
const path = require('path');
//app starts over here 
const app = express();
// app.use(express.json());
app.use(express.static(path.join(__dirname, 'public/Jobhunt')));
app.set('views', path.join(__dirname, 'public/Jobhunt'));
app.set('view engine', 'ejs');
// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())




//variables start over here
const PORT = process.env.PORT || 3000;

app.use('/user',userRoutes);
app.use('/candidate',candidateRoutes);
app.use('/employer',employerRoutes);
app.use('/',loginRoutes);


app.get('/',(request,response)=>{
    response.render(__dirname + '/public/Jobhunt/index', { request : request, response : response /* other models */});
});

app.listen(PORT,()=>{
    console.log("Server Started")
})