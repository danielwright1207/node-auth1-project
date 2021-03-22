// Require `checkUsernameFree`, `checkUsernameExists` and `checkPasswordLength`
// middleware functions from `auth-middleware.js`. You will need them here!
const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const User = require('../users/users-model')
const {checkUsernameFree, checkUsernameExists, checkPasswordLength} = require('./auth-middleware')

router.post('/register', checkUsernameFree, checkPasswordLength, (req, res, next) => {
  const {username, password} = req.body
  const hash = bcrypt.hashSync(password, 12)
  const userForDB = { username, password: hash }

  User.add(userForDB)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(next)
})

router.post('/login', (req, res, next) => {
  const {username, password} = req.body
  User.findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)){
        req.session.user = user // SAVE SESSION & SET COOKIE
        res.status(200).json({"message": "Welcome bob"})
      } else {
        res.status(401).json({"message": "Invalid credentials"})
      }
    })
    .catch(next)
})

router.get('/logout', (req, res, next) => {
  if(req.session && req.session.user) {
    req.session.destroy(err => {
      if (err) {
        res.json("you shall not pass")
      } else {
        res.json('logged out')
      }
    })
  } else {
    res.json('no session')
  }
})

module.exports = router
