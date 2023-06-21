"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("./user.route"));

var _business = _interopRequireDefault(require("./business.route"));

var _post = _interopRequireDefault(require("./post.route"));

var router = _express["default"].Router();

/**
 * Function contains Application routes
 *
 * @returns router
 */
var routes = function routes() {
  router.use('/users', _user["default"]);
  router.use('/business', _business["default"]);
  router.use('/post', _post["default"]);
  return router;
};

var _default = routes;
exports["default"] = _default;