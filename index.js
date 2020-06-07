const express = require('express');
const fs = require('fs');

const db = require('./db/mongoose');
db.connect();

//intalize routes 
const candidateRoutes = require('./routes/candidate.routes');
const employerRoutes = require('./routes/employer.routes');
const loginRoutes = require('./routes/login.routes');
const path = require('path');
//app starts over here 
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public/Jobhunt')));


//variables start over here
const PORT = process.env.PORT || 3000;

app.use('/candidate',candidateRoutes);
app.use('/employer',employerRoutes);
app.use('/',loginRoutes);


app.get('/',(request,response)=>{
    response.sendFile(__dirname + '/public/Jobhunt/index.html');
});

app.listen(PORT,()=>{
    console.log("Server Started")
})