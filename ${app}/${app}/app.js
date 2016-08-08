/**
 * 路由规则声明
 */
define(function(require, exports, modules) {
  var util = require('base-modules/utils');

  _.each([], function(router) {
    util.appRouterReg(router, 'app-${app}');
  });

  exports.init = function() {};
});
