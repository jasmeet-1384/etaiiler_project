import { Schema, model } from 'mongoose';
var Mongoose = require('mongoose');

const reportSchema = new Schema(
  {
    user_id: {
      type: Mongoose.Types.ObjectId,
    },
    postId: {
      type: String
    },
    postedBy: {
      type: Mongoose.Types.ObjectId,
    },
    remarks : {
        type: String
    }
  },
  {
    timestamps: true
  }
);

export default model('Report', reportSchema);
//User table name
