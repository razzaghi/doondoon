import Game2048 from '../models/game2048'

export const save2048 = (username, displayName, point=0) => {

  let newGame = new Game2048({
    username: username,
    displayName: displayName,
    point: point,
  })
  // save the user

  Game2048.findOne({
    username: username,
  }, function (err, user) {
    if (err) throw err

    if(user){
      user.point = point
      return user.save(function (success, err) {
        return !err

      })
    }else{
      newGame.save(function (success, err) {
        return !err

      })
    }
  })


}