const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const Config = require('../../config/config');
const User = require('./user.schema');

this.find = (query, projection = {}) => {
  return User.find(query, projection).lean();
};

this.findOne = (query) => {
  return User.findOne(query);
};

this.create = (user) => {
  return new Promise((rs, rj) => {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    User.create(user, (err, _user) => {
      if (err) {
        return rj(err);
      }
      return rs(_user);
    });
  });
};

this.update = (user) => {
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

this.delete = (user) => {
  return new Promise((rs, rj) => {
    User.findByIdAndRemove(user._id, (err, _user) => {
      if (err) {
        return rj(err);
      }
      return rs(_user);
    });
  });
};


this.init = async () => {
  console.log('dddddd')
  let _user = {
    name: "Super Admin",
    email: Config.superUser.email,
    password: Config.superUser.password,
    type: "SUPER_ADMIN"
  }
  try {
    let user = await this.findOne({ email: _user.email})
    if(!user) {
      await this.create(_user)
    }
  } catch(e) {
    await this.create(_user)
  }
};

this.init();