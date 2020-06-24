const mongoose = require('mongoose');
const { Schema } = mongoose;


var requirementSchema = new Schema( { name: String } );


const jobSchema  = new Schema({
    employer_id : {
        type : mongoose.Types.ObjectId
    },
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
    },
    applied_ids:{
        type : Array,
        default : []
    },
    shortlisted_ids : {
        type :Array,
        default : []
    },
    rejected_ids : {
        type :Array,
        default : []
    },
    country:{
        type : String
    },
    city : {
        type : String
    },
    offeredSalary : { 
        type : String
    },
    experienceRequired : {
        type  : String
    },
    qualification : {
        type :String
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