"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removePostLike = exports.removePostComment = exports.removePost = exports.getPostLikes = exports.getPostLikeCount = exports.getPostCommentCount = exports.getPostComment = exports.getOwnPostsCounts = exports.getOwnPosts = exports.getAllPosts = exports.addPostLike = exports.addPostComment = exports.addPost = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var PostService = _interopRequireWildcard(require("../services/post.service"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var addPost = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return PostService.addPost(req.body);

          case 3:
            data = _context.sent;
            res.status(data.code).json({
              code: data.code,
              data: data.data,
              message: data.message
            });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function addPost(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.addPost = addPost;

var removePost = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return PostService.removePost(req.body);

          case 3:
            data = _context2.sent;
            res.status(data.code).json({
              code: data.code,
              data: data.data,
              message: data.message
            });
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function removePost(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.removePost = removePost;

var getAllPosts = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return PostService.getAllPosts(req.body);

          case 3:
            data = _context3.sent;
            res.status(data.code).json({
              code: data.code,
              data: data.data,
              message: data.message
            });
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            next(_context3.t0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function getAllPosts(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getAllPosts = getAllPosts;

var getOwnPosts = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return PostService.getOwnPosts(req.body);

          case 3:
            data = _context4.sent;
            res.status(data.code).json({
              code: data.code,
              data: data.data,
              message: data.message
            });
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            next(_context4.t0);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function getOwnPosts(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getOwnPosts = getOwnPosts;

var getOwnPostsCounts = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return PostService.getOwnPostsCounts(req.body);

          case 3:
            data = _context5.sent;
            res.status(data.code).json({
              code: data.code,
              data: data.data,
              message: data.message
            });
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            next(_context5.t0);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function getOwnPostsCounts(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getOwnPostsCounts = getOwnPostsCounts;

var addPostLike = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return PostService.addPostLike(req.body);

          case 3:
            data = _context6.sent;
            res.status(data.code).json({
              code: data.code,
              data: data.data,
              message: data.message
            });
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            next(_context6.t0);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 7]]);
  }));

  return function addPostLike(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

exports.addPostLike = addPostLike;

var removePostLike = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return PostService.removePostLike(req.body);

          case 3:
            data = _context7.sent;
            res.status(data.code).json({
              code: data.code,
              data: data.data,
              message: data.message
            });
            _context7.next = 10;
            break;

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            next(_context7.t0);

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 7]]);
  }));

  return function removePostLike(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();

exports.removePostLike = removePostLike;

var getPostLikes = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return PostService.getPostLikes(req.body);

          case 3:
            data = _context8.sent;
            res.status(data.code).json({
              code: data.code,
              data: data.data,
              message: data.message
            });
            _context8.next = 10;
            break;

          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](0);
            next(_context8.t0);

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 7]]);
  }));

  return function getPostLikes(_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();

exports.getPostLikes = getPostLikes;

var getPostLikeCount = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return PostService.getPostLikeCount(req.body);

          case 3:
            data = _context9.sent;
            res.status(data.code).json({
              code: data.code,
              data: data.data,
              message: data.message
            });
            _context9.next = 10;
            break;

          case 7:
            _context9.prev = 7;
            _context9.t0 = _context9["catch"](0);
            next(_context9.t0);

          case 10:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 7]]);
  }));

  return function getPostLikeCount(_x25, _x26, _x27) {
    return _ref9.apply(this, arguments);
  };
}();

exports.getPostLikeCount = getPostLikeCount;

var addPostComment = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return PostService.addPostComment(req.body);

          case 3:
            data = _context10.sent;
            res.status(data.code).json({
              code: data.code,
              data: data.data,
              message: data.message
            });
            _context10.next = 10;
            break;

          case 7:
            _context10.prev = 7;
            _context10.t0 = _context10["catch"](0);
            next(_context10.t0);

          case 10:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 7]]);
  }));

  return function addPostComment(_x28, _x29, _x30) {
    return _ref10.apply(this, arguments);
  };
}();

exports.addPostComment = addPostComment;

var getPostComment = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _context11.next = 3;
            return PostService.getPostComment(req.body);

          case 3:
            data = _context11.sent;
            res.status(data.code).json({
              code: data.code,
              data: data.data,
              message: data.message
            });
            _context11.next = 10;
            break;

          case 7:
            _context11.prev = 7;
            _context11.t0 = _context11["catch"](0);
            next(_context11.t0);

          case 10:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 7]]);
  }));

  return function getPostComment(_x31, _x32, _x33) {
    return _ref11.apply(this, arguments);
  };
}();

exports.getPostComment = getPostComment;

var getPostCommentCount = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _context12.next = 3;
            return PostService.getPostCommentCount(req.body);

          case 3:
            data = _context12.sent;
            res.status(data.code).json({
              code: data.code,
              data: data.data,
              message: data.message
            });
            _context12.next = 10;
            break;

          case 7:
            _context12.prev = 7;
            _context12.t0 = _context12["catch"](0);
            next(_context12.t0);

          case 10:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[0, 7]]);
  }));

  return function getPostCommentCount(_x34, _x35, _x36) {
    return _ref12.apply(this, arguments);
  };
}();

exports.getPostCommentCount = getPostCommentCount;

var removePostComment = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _context13.next = 3;
            return PostService.removePostComment(req.body);

          case 3:
            data = _context13.sent;
            res.status(data.code).json({
              code: data.code,
              data: data.data,
              message: data.message
            });
            _context13.next = 10;
            break;

          case 7:
            _context13.prev = 7;
            _context13.t0 = _context13["catch"](0);
            next(_context13.t0);

          case 10:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 7]]);
  }));

  return function removePostComment(_x37, _x38, _x39) {
    return _ref13.apply(this, arguments);
  };
}();

exports.removePostComment = removePostComment;