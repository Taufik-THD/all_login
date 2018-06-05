var express = require('express')
var router = express.Router()
const steam = require('../middlewares/steam_auth')
const {  } = require('module');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

module.exports = router
