import { Schema, model } from 'mongoose';
var Mongoose = require('mongoose');

const hashTagSchema = new Schema(
  {
    postId: {
      type: Mongoose.Types.ObjectId
    },
    hashTag:{
      type:String
    }
  },
  {
    timestamps: true
  }
);

export default model('hashTag', hashTagSchema);