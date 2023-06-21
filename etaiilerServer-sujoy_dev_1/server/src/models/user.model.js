import { Schema, model } from 'mongoose';
var Mongoose = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    password: {
      type: String
    },
    dateOfBirth: {
      type: String,
    },
    bio: {
      type: String
    },
    country: {
      type: String
    },
    state: {
      type: String
    },
    city: {
      type: String
    },
    pincode: {
      type: Number
    },
    gender: {
      type: String
    },
    phoneNumber: {
      type: Number,
      required: true
    },
    fcmToken: {
      type: String,
      default: ""
    },
    os: {
      type: String,
      default: ""
    },
    role: {
      type: String
    },
    image: {
      type: String
    },
    followers: [{ type: Mongoose.Types.ObjectId }],
    following: [{ type: Mongoose.Types.ObjectId }],
    gpsAddress: { type: Mongoose.Types.ObjectId }
  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);
//User table name
