const Promise = require('bluebird');
const bcrypt = require('bcrypt');
// const Config = require('../../config/config');
var Job = require('../models/Job');
var resumJson = require('../resume.json')


function find (query = {} , projection = {}) {
  return Job.find(query, projection);
}

function findOne (query) {
  return Job.findOne(query);
}

function create (data) {  
  return new Promise((rs, rj) => {
    const hash = bcrypt.hashSync(data.password, 10);
    data.password = hash;
    let Job= new Job(data);
    Job.save(Job, (err, _Job) => {
      if (err) {
        return rj(err);
      }
      return rs(_Job);
    });
  });
};

function update(Job){
  return new Promise((rs, rj) => {
    if(Job.password) {
      const hash = bcrypt.hashSync(Job.password, 10);
      Job.password = hash;
    }
    Job.findOneAndUpdate({ _id : Job._id }, { '$set': Job }, { new: true }, (err, _Job) => {
      if (err) {
        return rj(err);
      }
      return rs(_Job);
    });   
  });
};

function deleteJob(Job) {
  return new Promise((rs, rj) => {
    Job.findByIdAndRemove(Job._id, (err, _Job) => {
      if (err) {
        return rj(err);
      }
      return rs(_Job);
    });
  });
};

module.exports = {
  create,
  find,
  findOne,
  update,
  deleteJob
}