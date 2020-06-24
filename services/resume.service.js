const Promise = require('bluebird');
const bcrypt = require('bcrypt');
// const Config = require('../../config/config');
var Resume = require('../models/Resume');
var resumJson = require('../resume.json')


function find (query = {} , projection = {}) {
  return Resume.find(query, projection);
}

function findOne (query) {
  return Resume.findOne(query);
}

function create (_id) {  
  return new Promise((rs, rj) => {
    var data  = resumJson;
    data.candidateId = _id;
    let resume= new Resume(data);
    resume.save(resume,(err, _Resume) => {
      if (err) {
        return rj(err);
      }
      console.log(_Resume)
      return rs(_Resume);
    });
  });
};

function update(Resume){
  return new Promise((rs, rj) => {
    if(Resume.password) {
      const hash = bcrypt.hashSync(Resume.password, 10);
      Resume.password = hash;
    }
    Resume.findOneAndUpdate({ _id : Resume._id }, { '$set': Resume }, { new: true }, (err, _Resume) => {
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