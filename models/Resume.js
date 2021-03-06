const mongoose = require('mongoose');
const { Schema } = mongoose;




var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const candidateSchema = new Schema({
    name : {
        type:String,
        required:true
    },
    email : {
        type : String,
        required: true,
        unique: true,
        trim: true,
        validate: [validateEmail,"Please Fill a valid email address"]
    },
    password : {
        type:String,
        required: true
    },
    phone_number : {
        type:Number,
        required : true,
        unique : true 
    },
    created_at : {
        type: Date
    },
    updated_at:{
        type:Date
    },
    picture:{
        type: String
    },
    userName : {
        required : true,
        type : String
    }
});



candidateSchema.pre('save', function(next) {
    if (!this.created_at) 
        this.created_at = new Date;
    this.updated_at = new Date;
    next();
});


const User =  mongoose.model('user',candidateSchema);
module.exports = User;