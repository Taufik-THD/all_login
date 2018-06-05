var express = require('express');
var router = express.Router();
const steam   = require('../controllers/steam_controller');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/verify', steam.verify(), function(req, res) {
  // console.log('berhasilllll', req.user)
	res.send(req.user).end();
});

module.exports = router;
