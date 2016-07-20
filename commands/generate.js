/**
 * 构件生成器
 */
'use strict';

exports.run = function(type, widgets, options) {
  if (!widgets.length) {
    console.error('至少指定一个构件名称');
    process.exit(1);
  }
  let generator = require(`../generator/${type}`);
  generator.generate && generator.generate(widgets, options);
};
