"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var businessSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  state: {
    type: String
  },
  city: {
    type: String
  },
  addressLine1: {
    type: String
  },
  addressLine2: {
    type: String
  },
  pincode: {
    type: Number
  },
  productCategory: {
    type: String
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  natureOfBusiness: {
    type: String
  },
  role: {
    type: String
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Business', businessSchema); //User table name


exports["default"] = _default;