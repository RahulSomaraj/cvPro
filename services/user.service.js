const Promise = require('bluebird');
const bcrypt = require('bcrypt');
// const Config = require('../../config/config');
var User = require('../models/User');
var mailer = require('./nodemailer')


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
        console.log(err);
        return rj(err);
      }
      console.log(_user)
      var emailData = {
        to : _user.email,
        text : `You have been succesfully registered` ,
        subject : "User Registration complete ",
        html : `<b>You have been succesfully registered</b>`
    }
      mailer.mail(emailData);
      return rs(_user);
    });
  });
};

function update(user){
  return new Promise((rs, rj) => {
    console.log(user);
    console.log(user);

    User.findOneAndUpdate({ _id : user._id }, { '$set': user} , {useFindAndModify: false,new: true }, (err, _user) => {
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