const express = require('express');

//intalize routes 
const login_routes = require('./routes/login.routes');

//app starts over here 
const app = express();
app.use(express.json());

//variables start over here
const PORT = porcess.env.PORT || 3000;

app.use('/login',login_routes);

app.listen(PORT,()=>{
    console.log("Server Started")
})