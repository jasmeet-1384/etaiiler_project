"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removePostLike = exports.removePostComment = exports.removePost = exports.getPostLikes = exports.getPostLikeCount = exports.getPostCommentCount = exports.getPostComment = exports.getOwnPostsCounts = exports.getOwnPosts = exports.getAllPosts = exports.addPostLike = exports.addPostComment = exports.addPost = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _comments = _interopRequireDefault(require("../models/comments.model"));

var _likes = _interopRequireDefault(require("../models/likes.model"));

var _post = _interopRequireDefault(require("../models/post.model"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var Mongoose = require('mongoose');

var addPost = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req) {
    var newPost, postDetails;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            newPost = new _post["default"](_objectSpread({}, req));
            _context.next = 4;
            return newPost.save();

          case 4:
            postDetails = _context.sent;
            return _context.abrupt("return", {
              message: "added successfully",
              code: 201,
              data: postDetails
            });

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function addPost(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.addPost = addPost;

var removePost = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _post["default"].remove({
              _id: Mongoose.Types.ObjectId(req.post_id)
            });

          case 3:
            return _context2.abrupt("return", {
              message: "deleted successfully",
              code: 201
            });

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            throw _context2.t0;

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 6]]);
  }));

  return function removePost(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.removePost = removePost;

var getAllPosts = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req) {
    var userPosts, businessPosts, combinedPosts;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _post["default"].find({
              role: "user"
            }).populate('user_id', null, 'User').exec();

          case 3:
            userPosts = _context3.sent;
            _context3.next = 6;
            return _post["default"].find({
              role: "business"
            }).populate('user_id', null, 'Business').exec();

          case 6:
            businessPosts = _context3.sent;
            combinedPosts = [].concat((0, _toConsumableArray2["default"])(userPosts), (0, _toConsumableArray2["default"])(businessPosts));
            return _context3.abrupt("return", {
              message: "posts fetched successfully",
              code: 201,
              data: {
                combinedPosts: combinedPosts
              }
            });

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](0);
            throw _context3.t0;

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 11]]);
  }));

  return function getAllPosts(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getAllPosts = getAllPosts;

var getOwnPosts = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req) {
    var userPosts, businessPosts;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _post["default"].find({
              user_id: Mongoose.Types.ObjectId(req.user_id),
              role: "user"
            }).populate('user_id', null, 'User').exec();

          case 3:
            userPosts = _context4.sent;
            _context4.next = 6;
            return _post["default"].find({
              user_id: Mongoose.Types.ObjectId(req.user_id),
              role: "business"
            }).populate('user_id', null, 'Business').exec();

          case 6:
            businessPosts = _context4.sent;
            return _context4.abrupt("return", {
              message: "added successfully",
              code: 201,
              data: {
                userPosts: userPosts,
                businessPosts: businessPosts
              }
            });

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            throw _context4.t0;

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 10]]);
  }));

  return function getOwnPosts(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getOwnPosts = getOwnPosts;

var getOwnPostsCounts = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req) {
    var userPosts;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _post["default"].count({
              user_id: Mongoose.Types.ObjectId(req.user_id)
            });

          case 3:
            userPosts = _context5.sent;
            return _context5.abrupt("return", {
              message: "added successfully",
              code: 201,
              data: {
                count: userPosts
              }
            });

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            throw _context5.t0;

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function getOwnPostsCounts(_x5) {
    return _ref5.apply(this, arguments);
  };
}(); ////////////////////////////////////


exports.getOwnPostsCounts = getOwnPostsCounts;

var addPostLike = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req) {
    var _addPostLike, addedLike;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _addPostLike = new _likes["default"](_objectSpread({}, req));
            _context6.next = 4;
            return _addPostLike.save();

          case 4:
            addedLike = _context6.sent;
            return _context6.abrupt("return", {
              message: "added successfully",
              code: 201,
              data: addedLike
            });

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](0);
            throw _context6.t0;

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 8]]);
  }));

  return function addPostLike(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

exports.addPostLike = addPostLike;

var removePostLike = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _likes["default"].remove({
              _id: Mongoose.Types.ObjectId(req.like_id)
            });

          case 3:
            return _context7.abrupt("return", {
              message: "like removed",
              code: 201
            });

          case 6:
            _context7.prev = 6;
            _context7.t0 = _context7["catch"](0);
            throw _context7.t0;

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 6]]);
  }));

  return function removePostLike(_x7) {
    return _ref7.apply(this, arguments);
  };
}();

exports.removePostLike = removePostLike;

var getPostLikes = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req) {
    var userLikes, businessLikes;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return Likes.find({
              post_id: Mongoose.Types.ObjectId(req.post_id),
              role: "user"
            }).populate('user_id', null, 'User').exec();

          case 3:
            userLikes = _context8.sent;
            _context8.next = 6;
            return Likes.find({
              post_id: Mongoose.Types.ObjectId(req.post_id),
              role: "business"
            }).populate('user_id', null, 'Business').exec();

          case 6:
            businessLikes = _context8.sent;
            return _context8.abrupt("return", {
              message: "added successfully",
              code: 201,
              data: {
                userLikes: userLikes,
                businessLikes: businessLikes
              }
            });

          case 10:
            _context8.prev = 10;
            _context8.t0 = _context8["catch"](0);
            throw _context8.t0;

          case 13:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 10]]);
  }));

  return function getPostLikes(_x8) {
    return _ref8.apply(this, arguments);
  };
}();

exports.getPostLikes = getPostLikes;

var getPostLikeCount = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req) {
    var count;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return _likes["default"].count({
              post_id: Mongoose.Types.ObjectId(req.post_id)
            });

          case 3:
            count = _context9.sent;
            return _context9.abrupt("return", {
              message: "added successfully",
              code: 201,
              data: {
                count: count
              }
            });

          case 7:
            _context9.prev = 7;
            _context9.t0 = _context9["catch"](0);
            throw _context9.t0;

          case 10:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 7]]);
  }));

  return function getPostLikeCount(_x9) {
    return _ref9.apply(this, arguments);
  };
}(); ////////////////////////////////////


exports.getPostLikeCount = getPostLikeCount;

var addPostComment = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req) {
    var addComment, commentDetails;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            addComment = new _comments["default"](_objectSpread({}, req));
            _context10.next = 4;
            return addComment.save();

          case 4:
            commentDetails = _context10.sent;
            return _context10.abrupt("return", {
              message: "comment added successfully",
              code: 201,
              data: commentDetails
            });

          case 8:
            _context10.prev = 8;
            _context10.t0 = _context10["catch"](0);
            throw _context10.t0;

          case 11:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 8]]);
  }));

  return function addPostComment(_x10) {
    return _ref10.apply(this, arguments);
  };
}();

exports.addPostComment = addPostComment;

var getPostComment = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req) {
    var userComment, businessComment;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _context11.next = 3;
            return _comments["default"].find({
              post_id: Mongoose.Types.ObjectId(req.post_id),
              role: "user"
            }).populate('user_id', null, 'User').exec();

          case 3:
            userComment = _context11.sent;
            _context11.next = 6;
            return _comments["default"].find({
              post_id: Mongoose.Types.ObjectId(req.post_id),
              role: "business"
            }).populate('user_id', null, 'Business').exec();

          case 6:
            businessComment = _context11.sent;
            return _context11.abrupt("return", {
              message: "comment fetched successfully",
              code: 201,
              data: {
                userComment: userComment,
                businessComment: businessComment
              }
            });

          case 10:
            _context11.prev = 10;
            _context11.t0 = _context11["catch"](0);
            throw _context11.t0;

          case 13:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 10]]);
  }));

  return function getPostComment(_x11) {
    return _ref11.apply(this, arguments);
  };
}();

exports.getPostComment = getPostComment;

var getPostCommentCount = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req) {
    var count;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _context12.next = 3;
            return _comments["default"].count({
              post_id: Mongoose.Types.ObjectId(req.post_id)
            });

          case 3:
            count = _context12.sent;
            return _context12.abrupt("return", {
              message: "added successfully",
              code: 201,
              data: {
                count: count
              }
            });

          case 7:
            _context12.prev = 7;
            _context12.t0 = _context12["catch"](0);
            throw _context12.t0;

          case 10:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[0, 7]]);
  }));

  return function getPostCommentCount(_x12) {
    return _ref12.apply(this, arguments);
  };
}();

exports.getPostCommentCount = getPostCommentCount;

var removePostComment = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req) {
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _context13.next = 3;
            return _comments["default"].remove({
              _id: Mongoose.Types.ObjectId(req.like_id)
            });

          case 3:
            return _context13.abrupt("return", {
              message: "comment removed",
              code: 201
            });

          case 6:
            _context13.prev = 6;
            _context13.t0 = _context13["catch"](0);
            throw _context13.t0;

          case 9:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 6]]);
  }));

  return function removePostComment(_x13) {
    return _ref13.apply(this, arguments);
  };
}();

exports.removePostComment = removePostComment;