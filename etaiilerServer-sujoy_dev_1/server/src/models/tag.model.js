import { Schema, model } from 'mongoose';
var Mongoose = require('mongoose');

const tagSchema = new Schema(
  {
    user_id: {
      type: Mongoose.Types.ObjectId
    },
    postId: {
      type: Mongoose.Types.ObjectId
    },
    role:{
      type:String
    }
  },
  {
    timestamps: true
  }
);

export default model('Tag', tagSchema);