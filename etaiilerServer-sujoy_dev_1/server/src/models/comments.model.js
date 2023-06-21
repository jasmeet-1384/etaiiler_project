import { Schema, model} from 'mongoose';

var Mongoose = require('mongoose');


const commentSchema = new Schema(
  {
    user_id: {
      
      type:  Mongoose.Types.ObjectId
    },
    postId: {
      type: Mongoose.Types.ObjectId
    },
    text: {
      type: String,
    },
    role:{
      type:String
    }
  },
  {
    timestamps: true
  }
);

export default model('Comment', commentSchema);
//User table name
