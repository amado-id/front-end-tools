"use strict";

var _Hello = _interopRequireDefault(require("/Hello.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

$(function () {
  var hello = new _Hello["default"]();
  hello.sayHi('Олег');
});