import User from '../models/user'
import Game2048 from '../models/game2048'
import { generateVerifyCode } from '../util/smsUtil'

export const registerUser = (username, fullName) => {
  let verifyCode = generateVerifyCode(4)

  let newUser = new User({
    username: username,
    fullName: fullName,
    verifyCode: verifyCode,
  })

  User.findOne({
    username: req.body.username,
  }, function (err, user) {
    if (err) throw err
    return false
  })

  // save the user
  newUser.save(function (err) {
    return !err
  })
}