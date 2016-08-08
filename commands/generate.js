/**
 * 构件生成器
 */
'use strict';
exports.run = function(type) {
  let argv = Array.prototype.slice.call(arguments, 1);
  let options = argv.pop();
  let generator = require(`../generator/${type}`);
  generator.generate && generator.generate(argv, options);
};
