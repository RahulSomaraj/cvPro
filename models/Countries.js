const mongoose = require('mongoose');
const { Schema } = mongoose;


var cities = new Schema( { name: String } );


const countrySchema  = new Schema({
    name : {
        type:String,
        required:true
    },
    cities:{
        type :Array,
        default :[]
    }
});

const Country =  mongoose.model('country',countrySchema);
module.exports = Country;


