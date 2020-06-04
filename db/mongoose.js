const config = require('../config/config');

// Lib
const Promise     = require('bluebird');
const mongoose    = require('mongoose');
mongoose.Promise = global.Promise;
const querystring = require('querystring');

let url = "";
//DB Config
const DB_HOST       = config.mongo.host;
const DB_NAME       = config.mongo.dbName;
const DB_RS_NAME    = config.mongo.dbRSName;
const DB_USE_SSL    = config.mongo.useSSL;
const DB_USER       = config.mongo.username;
const DB_PASS       = config.mongo.password;
const DB_AUTHDB     = config.mongo.authDB;

// Functions
this.connect = () => {
  return new Promise((rs, rj) => {
    var password = querystring.escape(`${DB_PASS}`);
    if(process.env.NODE_ENV=="production"){
        url = `mongodb://${DB_USER}:${password}@${DB_HOST.join()}/${DB_NAME}?ssl=${DB_USE_SSL}&replicaSet=${DB_RS_NAME}&authSource=${DB_AUTHDB}`;
    }
    if(process.env.NODE_ENV=="development"){
        url = `mongodb://${DB_HOST}:27017/${DB_NAME}`;   
    }
    mongoose.connect(url, { useNewUrlParser: true });
    let db = mongoose.connection;
    db.on('open', () => {
      console.log(`Connected to ${db.name}`);
      return rs();
    });
    db.on('error', err => {
      console.error('Connection error:', err);
      console.log('Process terminated');
      process.exit(1);
      return rj(err);
    });
    return db.on('SIGINT', () => {
      console.log('Mongoose disconnected due to app termination');
      return process.exit(0);
    });
  });
};
module.exports = this;