const express = require('express');
const fs = require('fs');
const db = require('./db/mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

db.connect();

//app starts over here
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// var cookieParser = require('cookie-parser')
// app.use(cookieParser());

app.use(session({
    secret: 'JobCvPro-4376vqo37t4b57oa2vt4viuaywgze4ti74',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true ,maxAge: 86400000}
}))

//intalize routes
const candidateRoutes = require('./routes/candidate.routes');
const employerRoutes = require('./routes/employer.routes');
const loginRoutes = require('./routes/login.routes');
const jobRoutes = require('./routes/jobs.routes');
const userRoutes = require('./routes/user.routes');
const path = require('path');

app.use('/user',userRoutes);
app.use('/candidate',candidateRoutes);
app.use('/employer',employerRoutes);
app.use('/job',jobRoutes);
app.use('/',loginRoutes);



// app.use(express.json());
app.use(express.static(path.join(__dirname, 'public/Jobhunt')));
app.set('views', path.join(__dirname, 'public/Jobhunt'));
app.set('view engine', 'ejs');



app.get('/', (request, response) => {
    var responsetoclient={
        loginstatus : true,
        forgotPassword : false
    }
    response.render(__dirname + '/public/Jobhunt/index', {
        data : {...responsetoclient},
        request : request,
        response : response
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("Server Started")
})









