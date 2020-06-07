const Promise = require('bluebird');
const bcrypt = require('bcrypt');
// const Config = require('../../config/config');
var User = require('../models/Job');


function find (query = {} , projection = {}) {
  return User.find(query, projection);
}

function findOne (query) {
  return User.findOne(query);
}

function create (data) {  
  return new Promise((rs, rj) => {
    const hash = bcrypt.hashSync(data.password, 10);
    data.password = hash;
    let user= new User(data);
    user.save(user, (err, _user) => {
      if (err) {
        return rj(err);
      }
      return rs(_user);
    });
  });
};

function update(user){
  return new Promise((rs, rj) => {
    if(user.password) {
      const hash = bcrypt.hashSync(user.password, 10);
      user.password = hash;
    }
    User.findOneAndUpdate({ _id : user._id }, { '$set': user }, { new: true }, (err, _user) => {
      if (err) {
        return rj(err);
      }
      return rs(_user);
    });   
  });
};

function deleteUser(user) {
  return new Promise((rs, rj) => {
    User.findByIdAndRemove(user._id, (err, _user) => {
      if (err) {
        return rj(err);
      }
      return rs(_user);
    });
  });
};

module.exports = {
  create,
  find,
  findOne,
  update,
  deleteUser
}