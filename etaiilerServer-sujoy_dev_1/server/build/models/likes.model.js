"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var Mongoose = require('mongoose');

var likeSchema = new _mongoose.Schema({
  user_id: {
    type: Mongoose.Types.ObjectId
  },
  post_id: {
    type: Mongoose.Types.ObjectId
  },
  role: {
    type: String
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Like', likeSchema); //User table name


exports["default"] = _default;