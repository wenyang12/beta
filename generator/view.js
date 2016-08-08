/**
 * 生成Backbone视图
 */
'use strict';

const fs = require('fs');
const utils = require('../utils');
const cwd = process.cwd();

exports.generate = (views, options) => {
  if (!views || !views.length) {
    utils.error('至少指定一个视图');
    process.exit(1);
  }

  let match = cwd.match(/.*\/\w+\/(\w+)$/) || [];
  let dir = `${cwd}/${match[1]}/modules`;

  views.forEach((view) => {
    if (!/^[a-zA-Z0-9\-_\/]+$/.test(view)) {
      utils.error('视图名称只能由字母、数字、-、_和/字符组成');
      process.exit(1);
    }

    try {
      fs.statSync(`${dir}/${view}`);
      if (options.force) {
        console.log(`覆盖旧${view}视图`);
        utils.createView(view, dir);
        return;
      }
      utils.error(`${view}视图已存在`);
    } catch (e) {
      console.log(`开始创建${view}视图`);
      utils.createView(view, dir);
      console.log(`成功创建${view}视图`);
    }
  });

  // 删除.gitignore
  fs.unlink(`${dir}/.gitignore`, () => {});
};
