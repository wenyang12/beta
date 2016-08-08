/**
 * 创建项目
 */
'use strict';
exports.run = (project, type) => {
  let generator = require(`../generator/project`);
  generator.generate(project, type);
};
