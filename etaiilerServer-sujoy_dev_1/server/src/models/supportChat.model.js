import { Schema, model } from 'mongoose';
var Mongoose = require('mongoose');

const supportSchema = new Schema(
  {
    user_id: {
      type: Mongoose.Types.ObjectId
    },
    text: {
      type: String
    },
    role:{
      type:String
    }
  },
  {
    timestamps: true
  }
);

export default model('Support', supportSchema);