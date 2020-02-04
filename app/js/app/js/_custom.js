(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  var _custom = _interopRequireDefault(require("_custom"));

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  var newform = new _custom["default"]({
    name: 'John',
    age: 12
  }); // newform.consoleLog();

}));
