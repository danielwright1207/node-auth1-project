


const { findBy } = require("../users/users-model")


function restricted(req, res, next) {
  if(!req.session && !req.session.user){
    res.status(401).json({"message": "You shall not pass!"})
  } else {
    next()
  }
}

async function checkUsernameFree(req, res, next) {
  const checkUsername = await findBy({ username: req.body.username }).first()
  if(checkUsername.length >= 1){
    res.status(422).json({"message": "Username taken"})
  } else {
    next()
  }
}

async function checkUsernameExists(req, res, next) {
  const userExists = await findBy({ username: req.body.username })
  if(userExists.length < 1){
    res.status(401).json({"message": "Invalid credentials"})
  } else {
    next()
  }
}

function checkPasswordLength(req, res, next) {
  if(!req.body.password || req.body.password.length <= 3 ) {
    res.status(422).json({"message": "Password must be longer than 3 chars"})
  } else {
    next()
  }
}

// Don't forget to add these to the exports object so they can be required in other modules
module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength
}















// // const express = require('express')
// const bcrypt = require('bcryptjs')
// const User = require('../users/users-model')

// /*
//   If the user does not have a session saved in the server

//   status 401
//   {
//     "message": "You shall not pass!"
//   }
// */
// function restricted(req, res, next) {
//   if(!req.session && !req.session.user){
//     res.status(401).json({
//       "message": "You shall not pass!"
//     })
//   } else {
//     next()
//   }
// }

// /*
//   If the username in req.body already exists in the database

//   status 422
//   {
//     "message": "Username taken"
//   }
// */
// async function checkUsernameFree(req, res, next) {
// const checkUsername = await User.findBy({ username: req.body.username})
// if(checkUsername.length >= 1){
//   res.status(422).json({"message": "Username taken"})
// } else {
//   next()
// }
 
// }

// /*
//   If the username in req.body does NOT exist in the database

//   status 401
//   {
//     "message": "Invalid credentials"
//   }
// */

//   async function checkUsernameExists(req, res, next) {
//     const userExists = await User.findBy({ username: req.body.username })
//     if(userExists.length < 1){
//       res.status(401).json({"message": "Invalid credentials"})
//     } else {
//       next()
//     }
//   }

//   // const { username, password } = req.body
//   // User.findBy({ username })
//   //   .first()
//   //   .then(user => {
//   //     if (user && bcrypt.compareSync(password, user.password)) {
//   //       req.session.user = user
//   //       res.json('welcome back!')
//   //     } else {
//   //       res.status(401).json('invalid credentials')
//   //     }
//   //   })
//   //   .catch(next)


// /*
//   If password is missing from req.body, or if it's 3 chars or shorter

//   status 422
//   {
//     "message": "Password must be longer than 3 chars"
//   }
// */
// function checkPasswordLength(req, res, next) {
//   if(!req.body.password || req.body.password.length <= 3){
//     res.status(422).json({
//       "message": "Password must be longer than 3 chars"
//     })
//   } else {
//     next()
//   }

// }

// // Don't forget to add these to the `exports` object so they can be required in other modules
// module.exports = {
//   checkPasswordLength,checkUsernameExists, checkUsernameFree, restricted
// }