const mongoose = require('mongoose');
const { Schema } = mongoose;


var requirementSchema = new Schema( { name: String } );


const jobSchema  = new Schema({
    title : {
        type:String,
        required:true
    },
    subtitle : {
        type : String,
        required: true,
        trim: true,
    },
    jobId : {
        type:String,
        required: true
    },
    requirements : {
        type:[requirementSchema],
        required : true
    },
    description:{
        type: String,
        required : true
    },
    created_at : {
        type: Date
    },
    updated_at:{
        type:Date
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