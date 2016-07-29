/**
 * 生成页面
 * 支持在父页面下创建子页面，调用方式：beta generate page parent/child
 */
'use strict';

const fs = require('fs');
const utils = require('../utils');
const cwd = process.cwd(); // 返回nodejs进程的当前工作目录
const page_dir = `${cwd}/src/pages`; // 页面所在目录

exports.generate = (pages, options) => {
  if (!pages || !pages.length) {
    utils.error('至少指定一个页面');
    process.exit(1);
  }

  pages.forEach((page) => {
    if (!/^[A-Z]/.test(page)) {
      utils.error('页面名称必须已大写字母开头(JSX组件规范)');
      process.exit(1);
    }

    if (!/^[a-zA-Z0-9]+$/.test(page)) {
      utils.error('页面名称只能由英文字母和数字组成');
      process.exit(1);
    }

    try {
      fs.statSync(`${page_dir}/${page}`);
      if (options.force) {
        console.log(`覆盖旧${page}页面`);
        utils.createComponent(page, page_dir);
        return;
      }
      utils.error(`${page}页面已存在`);
    } catch (e) {
      console.log(`开始创建${page}页面`);
      utils.createComponent(page, page_dir);
      console.log(`成功创建${page}页面`);
    }
  });

  // 删除.gitignore
  fs.unlink(`${page_dir}/.gitignore`, () => {});
};
