const express = require('express');
const router = express.Router()
const User = require('../users/users-model')
const {restricted} = require('../auth/auth-middleware')

  router.get('/', restricted, (req, res) => {
    User.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(401).json("You shall not pass", err)
    })
  })

module.exports = router