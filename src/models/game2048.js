import mongoose from 'mongoose'

let Schema = mongoose.Schema
let collectionName = 'game2048'

let game2048Schema = new Schema({
  'username': {
    type: String,
    required: true,
    unique: true,
  },
  'displayName': {
    type: String,
  },
  'point': {
    type: Number,
  },
}, {
  collection: collectionName,
})
// defining indexes
game2048Schema.index({username: 1})

game2048Schema.post('save', (doc) => {

})
game2048Schema.post('remove', (doc) => {
})

export default mongoose.model('Game2048', game2048Schema)
