"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userResgister = exports.userOtpVerification = exports.userOtp = exports.userLogin = exports.updateUser = exports.newUser = exports.getUser = exports.deleteUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _business = _interopRequireDefault(require("../models/business.model"));

var _otp = _interopRequireDefault(require("../models/otp.model"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var jwt = _interopRequireWildcard(require("jsonwebtoken"));

var _otpGenerator = _interopRequireDefault(require("otp-generator"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

//get all users
var userResgister = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req) {
    var userData, passwordHash, _newUser, userDetails;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user["default"].find({
              phoneNumber: req.phoneNumber
            });

          case 2:
            userData = _context.sent;
            console.log(req, "dataaaaaa");

            if (userData.length) {
              _context.next = 16;
              break;
            }

            _context.next = 7;
            return _bcrypt["default"].hash(req.password, 10);

          case 7:
            passwordHash = _context.sent;
            req.password = passwordHash;
            _newUser = new _user["default"](_objectSpread({}, req));
            _context.next = 12;
            return _newUser.save();

          case 12:
            userDetails = _context.sent;
            return _context.abrupt("return", {
              message: "added successfully",
              code: 201,
              data: userDetails
            });

          case 16:
            return _context.abrupt("return", {
              message: "user already registered",
              code: 400,
              data: {}
            });

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function userResgister(_x) {
    return _ref.apply(this, arguments);
  };
}(); //user login


exports.userResgister = userResgister;

var userLogin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var userData, businessData, passwordVerify, payload, token, dataUser, _passwordVerify, _payload, _token, _dataUser;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user["default"].findOne({
              phoneNumber: req.phoneNumber
            });

          case 2:
            userData = _context2.sent;
            _context2.next = 5;
            return _business["default"].findOne({
              phoneNumber: req.phoneNumber
            });

          case 5:
            businessData = _context2.sent;

            if (!userData) {
              _context2.next = 20;
              break;
            }

            _context2.next = 9;
            return _bcrypt["default"].compare(req.password, userData.password);

          case 9:
            passwordVerify = _context2.sent;

            if (!passwordVerify) {
              _context2.next = 17;
              break;
            }

            payload = {
              phoneNumber: userData.phoneNumber
            };
            token = jwt.sign(payload, process.env.TOKEN_SECRET, {
              expiresIn: "1d"
            });
            dataUser = {
              token: token,
              userData: userData
            };
            return _context2.abrupt("return", {
              data: dataUser,
              message: "Login sucess",
              code: 200
            });

          case 17:
            return _context2.abrupt("return", {
              data: {},
              message: "Wrong Password",
              code: 403
            });

          case 18:
            _context2.next = 35;
            break;

          case 20:
            if (!businessData) {
              _context2.next = 34;
              break;
            }

            _context2.next = 23;
            return _bcrypt["default"].compare(req.password, businessData.password);

          case 23:
            _passwordVerify = _context2.sent;

            if (!_passwordVerify) {
              _context2.next = 31;
              break;
            }

            _payload = {
              phoneNumber: businessData.phoneNumber
            };
            _token = jwt.sign(_payload, process.env.TOKEN_SECRET, {
              expiresIn: "1d"
            });
            _dataUser = {
              token: _token,
              businessData: businessData
            };
            return _context2.abrupt("return", {
              data: _dataUser,
              message: "Login sucess",
              code: 200
            });

          case 31:
            return _context2.abrupt("return", {
              data: {},
              message: "Wrong Password",
              code: 403
            });

          case 32:
            _context2.next = 35;
            break;

          case 34:
            return _context2.abrupt("return", {
              data: {},
              message: "phone number not found!! Register first",
              code: 403
            });

          case 35:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function userLogin(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}(); //otp generation


exports.userLogin = userLogin;

var userOtp = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var userData, OTP, hashOtp, otp, otpDetails;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _user["default"].findOne({
              phoneNumber: req.phoneNumber
            });

          case 2:
            userData = _context3.sent;

            if (!userData) {
              _context3.next = 16;
              break;
            }

            OTP = _otpGenerator["default"].generate(6, {
              digits: true,
              lowerCaseAlphabets: false,
              upperCaseAlphabets: false,
              specialChars: false
            });
            console.log(OTP, "<== OTP GENERATED"); // const salt = await bcrypt.genSalt(10)

            _context3.next = 8;
            return _bcrypt["default"].hash(OTP, 10);

          case 8:
            hashOtp = _context3.sent;
            otp = new _otp["default"]({
              phoneNumber: req.phoneNumber,
              otp: hashOtp
            });
            _context3.next = 12;
            return otp.save();

          case 12:
            otpDetails = _context3.sent;
            return _context3.abrupt("return", {
              message: "otp send successfully",
              code: 201,
              data: otpDetails
            });

          case 16:
            return _context3.abrupt("return", {
              data: {},
              message: "Phone number not found!! Register first",
              code: 403
            });

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function userOtp(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}(); //otp verification


exports.userOtp = userOtp;

var userOtpVerification = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var otpData, rightOtpFind, validUser, payload, token, otpVerification;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _otp["default"].find({
              phoneNumber: req.phoneNumber
            });

          case 2:
            otpData = _context4.sent;
            console.log(otpData);

            if (!otpData) {
              _context4.next = 19;
              break;
            }

            rightOtpFind = otpData[otpData.length - 1];
            _context4.next = 8;
            return _bcrypt["default"].compare(req.otp, rightOtpFind.otp);

          case 8:
            validUser = _context4.sent;

            if (!(rightOtpFind.phoneNumber === req.phoneNumber && validUser)) {
              _context4.next = 16;
              break;
            }

            payload = {
              phoneNumber: otpData.phoneNumber
            };
            token = jwt.sign(payload, process.env.TOKEN_SECRET, {
              expiresIn: "1d"
            });
            otpVerification = {
              token: token,
              rightOtpFind: rightOtpFind
            };
            return _context4.abrupt("return", {
              data: otpVerification,
              message: "Login sucess",
              code: 200
            });

          case 16:
            return _context4.abrupt("return", {
              data: {},
              message: "Wrong Otp",
              code: 403
            });

          case 17:
            _context4.next = 20;
            break;

          case 19:
            return _context4.abrupt("return", {
              data: {},
              message: "Phone number not found!! Register first",
              code: 403
            });

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function userOtpVerification(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}(); //create new user


exports.userOtpVerification = userOtpVerification;

var newUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(body) {
    var data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _user["default"].create(body);

          case 2:
            data = _context5.sent;
            return _context5.abrupt("return", data);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function newUser(_x8) {
    return _ref5.apply(this, arguments);
  };
}(); //update single user


exports.newUser = newUser;

var updateUser = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_id, body) {
    var data;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _user["default"].findByIdAndUpdate({
              _id: _id
            }, body, {
              "new": true
            });

          case 2:
            data = _context6.sent;
            return _context6.abrupt("return", data);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function updateUser(_x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}(); //delete single user


exports.updateUser = updateUser;

var deleteUser = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(id) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _user["default"].findByIdAndDelete(id);

          case 2:
            return _context7.abrupt("return", '');

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function deleteUser(_x11) {
    return _ref7.apply(this, arguments);
  };
}(); //get single user


exports.deleteUser = deleteUser;

var getUser = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(id) {
    var data;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _user["default"].findById(id);

          case 2:
            data = _context8.sent;
            return _context8.abrupt("return", data);

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function getUser(_x12) {
    return _ref8.apply(this, arguments);
  };
}();

exports.getUser = getUser;