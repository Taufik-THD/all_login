const express = require('express')
const router = express.Router()
const { LoginGithub } = require('../controllers/user_controller')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource')
})

router.post('/', LoginGithub)

module.exports = router
