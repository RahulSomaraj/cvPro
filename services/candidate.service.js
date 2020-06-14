const Promise = require('bluebird');
const bcrypt = require('bcrypt');
// const Config = require('../../config/config');
var Resume = require('../models/Resume');



function find (query = {} , projection = {}) {
    return Resume.find(query, projection);
  }
  
  function findOne (query) {
    return Resume.findOne(query);
  }
  
  function create (data) {  
    return new Promise((rs, rj) => {
      const hash = bcrypt.hashSync(data.password, 10);
      data.password = hash;
      let Resume= new Resume(data);
      Resume.save(Resume, (err, _Resume) => {
        if (err) {
          console.log(err);
          return rj(err);
        }
        console.log(_Resume)
        var emailData = {
          to : _Resume.email,
          text : `You have been succesfully registered` ,
          subject : "Resume Registration complete ",
          html : `<b>You have been succesfully registered</b>`
      }
        mailer.mail(emailData);
        return rs(_Resume);
      });
    });
  };
  
  function update(Resume){
    return new Promise((rs, rj) => {
      console.log(Resume);
      if(Resume.password) {
        const hash = bcrypt.hashSync(Resume.password, 10);
        Resume.password = hash;
      }
      Resume.findOneAndUpdate({ _id : Resume._id }, { '$set': {...Resume}} , {useFindAndModify: false,new: true }, (err, _Resume) => {
        if (err) {
          return rj(err);
        }
        return rs(_Resume);
      });   
    });
  };
  
  function deleteResume(Resume) {
    return new Promise((rs, rj) => {
      Resume.findByIdAndRemove(Resume._id, (err, _Resume) => {
        if (err) {
          return rj(err);
        }
        return rs(_Resume);
      });
    });
  };
  
  module.exports = {
    create,
    find,
    findOne,
    update,
    deleteResume
  }