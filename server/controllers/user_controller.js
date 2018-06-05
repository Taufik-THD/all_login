const User = require('../models/user');

module.exports = {
  LoginGithub(req, res){
    console.log(req.body);
  },

  LoginSteam(req, res){

    const userData = {
      steamID: req.user.steamid,
      username: req.user.username
    }

    console.log(userData);
  }
};
