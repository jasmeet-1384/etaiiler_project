"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateUploadUrl = generateUploadUrl;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _crypto = _interopRequireDefault(require("crypto"));

var _util = require("util");

var randomBytes = (0, _util.promisify)(_crypto["default"].randomBytes);
var region = "ap-south-1";
var bucketName = "etaiiler-image-upload";
var accessKeyId = process.env.AWS_ACCESS_KEY_ID;
var secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
var s3 = new _awsSdk["default"].S3({
  region: region,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  signatureVersion: 'v4'
});

function generateUploadUrl() {
  return _generateUploadUrl.apply(this, arguments);
}

function _generateUploadUrl() {
  _generateUploadUrl = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var rawBytes, imageName, params, uploadUrl;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return randomBytes(16);

          case 2:
            rawBytes = _context.sent;
            imageName = rawBytes.toString('hex');
            params = {
              Bucket: bucketName,
              Key: imageName,
              Expires: 60
            };
            _context.next = 7;
            return s3.getSignedUrlPromise('putObject', params);

          case 7:
            uploadUrl = _context.sent;
            return _context.abrupt("return", uploadUrl);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _generateUploadUrl.apply(this, arguments);
}