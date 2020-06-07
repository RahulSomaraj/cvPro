let userModel = require('../models/User');
let bcrypt = require("bcrypt");

function login(query){
    return new Promise((resolve,reject)=>{
        console.log(query);
        query.password = bcrypt.hashSync(query.password, 10);
        userModel.findOne(query,(err,data)=>{
            if (err) return reject(err);
            return resolve(data);
        });
    });
}

function logout(){
    return true;
}


module.exports = {
    login,
    logout
}
// module.exports = this;