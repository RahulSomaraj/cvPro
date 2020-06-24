const Promise = require('bluebird');
const bcrypt = require('bcrypt');
// const Config = require('../../config/config');
var Country = require('../models/Countries');


function find (query = {} , projection = {}) {
  return Country.find(query, projection);
}

function findOne (query) {
  return Country.findOne(query);
}

function create (data) {  
  return new Promise((rs, rj) => {
    const hash = bcrypt.hashSync(data.password, 10);
    data.password = hash;
    let Country= new Country(data);
    Country.save(Country, (err, _Country) => {
      if (err) {
        return rj(err);
      }
      return rs(_Country);
    });
  });
};

function update(Country){
  return new Promise((rs, rj) => {
    if(Country.password) {
      const hash = bcrypt.hashSync(Country.password, 10);
      Country.password = hash;
    }
    Country.findOneAndUpdate({ _id : Country._id }, { '$set': Country }, { new: true }, (err, _Country) => {
      if (err) {
        return rj(err);
      }
      return rs(_Country);
    });   
  });
};

function deleteCountry(Country) {
  return new Promise((rs, rj) => {
    Country.findByIdAndRemove(Country._id, (err, _Country) => {
      if (err) {
        return rj(err);
      }
      return rs(_Country);
    });
  });
};

module.exports = {
  create,
  find,
  findOne,
  update,
  deleteCountry
}