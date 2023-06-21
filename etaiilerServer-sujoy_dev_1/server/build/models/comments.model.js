"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var Mongoose = require('mongoose');

var commentSchema = new _mongoose.Schema({
  user_id: {
    type: Mongoose.Types.ObjectId
  },
  post_id: {
    type: Mongoose.Types.ObjectId
  },
  comment: {
    type: String
  },
  role: {
    type: String
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Comment', commentSchema); //User table name


exports["default"] = _default;