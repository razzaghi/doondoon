import mongoose from 'mongoose'

let Schema = mongoose.Schema

let BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
})

export default BookSchema
