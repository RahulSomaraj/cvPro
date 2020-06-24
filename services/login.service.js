let userModel = require('../models/User');
let bcrypt = require("bcrypt");

function login(query){
    return new Promise((resolve,reject)=>{
        console.log("query");
        var finalquery = {
            $and : [
                {
                    $or : [
                        { userName : { $regex  : query.userName } },
                        { email  : { $regex : query.userName } } ,
                        
                    ]
                },
                {userType : query.userType},                
            ]
        }
        
        console.log(JSON.stringify(finalquery));
        console.log(query)        
        
        userModel.findOne(finalquery,(err,data)=>{
            if (err) return reject(err);
            if(!!data){
                query = bcrypt.compareSync(query.password, data.password);
                if(query){
                    console.log("Login done");
                    return resolve(data);
                }else{
                    console.log("Login Failed");
                    return resolve({})
                }
            }else{
                return resolve({})
            }
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