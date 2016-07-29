/**
 * 创建项目
 */
'use strict';
const generator = require('../generator/project');
const utils = require('../utils');

exports.run = (project) => {
  if (!project) {
    utils.error('必须指定项目名称');
    process.exit(1);
  }
  generator.generate(project);
};
