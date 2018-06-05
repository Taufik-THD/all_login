const express = require('express')
const router = express.Router()
const { LoginGithub } = require('../controllers/user_controller')
const steam   = require('../controllers/steam_controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource')
})

router.post('/', LoginGithub)
router.get('/steam/authenticate', steam.authenticate(), function(req, res) {
	res.redirect('/');
});


module.exports = router
