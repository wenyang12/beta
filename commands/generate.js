/**
 * 构件生成器
 */
'use strict';
const utils = require('../utils');

exports.run = (type, widgets, options) => {
  if (!widgets.length) {
    utils.error('至少指定一个构件名称');
    process.exit(1);
  }
  let generator = require(`../generator/${type}`);
  generator.generate && generator.generate(widgets, options);
};
