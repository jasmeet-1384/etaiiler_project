import { Schema, model } from 'mongoose';
var Mongoose = require('mongoose');

const postSchema = new Schema(
  {
    user_id: {
      type: Mongoose.Types.ObjectId,
    },
    image: {
      type: String
    },
    description: {
      type: String,
    },
    role: {
      type: String
    },
    likes: [{
      likedBy: Mongoose.Types.ObjectId,
      createdAt: { type: Date, default: Date.now }
    }],
    comments: [{
      text: String,
      postedBy: Mongoose.Types.ObjectId,
      createdAt: { type: Date, default: Date.now }
    }],
    tags: [{ taggedPerson: Mongoose.Types.ObjectId }],
    share: [{ sharedBy: Mongoose.Types.ObjectId }],
    postType: {
      type: String
    },
    promoFromhrs: {
      type: String
    },
    promoTohrs: {
      type: String
    },
    promoFromDate: {
      type: String
    },
    promoToDate: {
      type: String
    },
    promoOfferDetails: {
      type: String
    },
    promoLink: {
      type: String
    },
    promoTotalPayable: {
      type: String
    },
    homeScreen: {
      type: Boolean
    },
    range: {
      type: String
    },
    promoPlanState: {
      type: String
    },
    promoPlanTransactionId : {
      type : Mongoose.Types.ObjectId
    }
  },
  {
    timestamps: true
  }
);

export default model('Post', postSchema);
//Post table name
