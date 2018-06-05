const express = require('express')
const router = express.Router()
const { LoginGithub, LoginSteam } = require('../controllers/user_controller')
const steam = require('../middlewares/steam_auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource')
})

router.post('/', LoginGithub)
router.get('/steam/authenticate', steam.authenticate(), function(req, res) {
	console.log('steam login');
});

router.get('/verify', steam.verify(), LoginSteam)

module.exports = router
