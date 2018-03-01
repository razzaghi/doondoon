import express from 'express'
import jwt from 'jsonwebtoken'
import config from '../config/database'
import { registerUser } from '../logic/user'
import { save2048 } from '../logic/game'

let router = express.Router()

router.post('/signup', function (req, res) {
  if (!req.body.username || !req.body.fullName) {
    res.json({success: false, msg: 'Please pass username and fullname.'})
  } else {

    if (registerUser(req.body.username, req.body.fullName)) {
      res.json({success: true, msg: 'Successful created new user.'})
    } else {
      return res.json({success: false, msg: 'Username already exists.'})
    }
  }
})

router.post('/signin', function (req, res) {
  User.findOne({
    username: req.body.username,
  }, function (err, user) {
    if (err) throw err

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'})
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          let token = jwt.sign(user, config.secret)
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token})
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'})
        }
      })
    }
  })
})

router.post('/save2048', function (req, res) {
  if (!req.body.username || !req.body.displayName || !req.body.point ) {
    res.json({success: false, msg: 'Please pass username and displayName and point.'})
  } else {

    if (save2048(req.body.username, req.body.displayName, req.body.point)) {
      res.json({success: true, msg: 'Successful save your score.'})
    } else {
      return res.json({success: false, msg: 'Username already exists.'})
    }
  }
})

const getToken = (headers) => {
  if (headers && headers.authorization) {
    let parted = headers.authorization.split(' ')
    if (parted.length === 2) {
      return parted[1]
    } else {
      return null
    }
  } else {
    return null
  }
}

export default router
