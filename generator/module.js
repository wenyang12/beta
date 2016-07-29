/**
 * 生成业务模块（非UI组件）
 */
'use strict';

const fs = require('fs');
const utils = require('../utils');
const cwd = process.cwd();
let module_dir = `${cwd}/src/modules`;

exports.generate = (modules, options) => {
  if (!modules || !modules.length) {
    utils.error('至少指定一个模块');
    process.exit(1);
  }

  let dir = module_dir;

  if (options.package) {
    dir += `/${options.package}`;
    try {
      fs.statSync(dir);
    } catch (e) {
      fs.mkdirSync(dir);
    }
  }

  modules.forEach((module) => {
    if (!/^[a-z]/.test(module)) {
      utils.error('模块名称必须以小写字母开头');
      process.exit(1);
    }

    if (!/^[a-z0-9\-_]+$/.test(module)) {
      utils.error('模块名称只能由小写字母、数字、-和_字符组成');
      process.exit(1);
    }

    let file = `${dir}/${module}.js`;
    let create = (file) => (fs.writeFileSync(file, 'module.exports = null;', 'utf8'));
    try {
      fs.statSync(file);
      if (options.force) {
        console.log(`覆盖旧${module}模块`);
        create(file);
        return;
      }
      utils.error(`模块${module}已存在`);
    } catch (e) {
      console.log(`开始创建${module}模块`);
      create(file);
      console.log(`成功创建${module}模块`);
    }
  });

  // 删除.gitignore
  fs.unlink(`${module_dir}/.gitignore`, () => {});
};
