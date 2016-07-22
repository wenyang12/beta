/**
 * 创建项目
 */
'use strict';
const generator = require('../generator/project');

exports.run = function(project) {
  if (!project) {
    console.error('Error:必须指定项目名称');
    process.exit(1);
  }
  generator.generate(project);
};
