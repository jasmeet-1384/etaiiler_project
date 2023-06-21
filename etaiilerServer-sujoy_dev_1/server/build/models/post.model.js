"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var Mongoose = require('mongoose');

var postSchema = new _mongoose.Schema({
  user_id: {
    type: Mongoose.Types.ObjectId
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  role: {
    type: String
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Post', postSchema); //User table name


exports["default"] = _default;