/**
 * 生成业务模块（非UI组件）
 */
'use strict';

const fs = require('fs');
const cwd = process.cwd();
let module_dir = `${cwd}/src/modules`;

exports.generate = function(modules, options) {
  if (!modules || !modules.length) {
    console.error('至少指定一个模块');
    process.exit(1);
  }

  if (options.package) {
    module_dir += `/${options.package}`;
    try {
      fs.statSync(module_dir);
    } catch (e) {
      fs.mkdirSync(module_dir);
    }
  }

  modules.forEach((module) => {
    let file = `${module_dir}/${module}.js`;
    let create = function(file) {
      fs.writeFileSync(file, 'module.exports = null;', 'utf8');
    };
    try {
      fs.statSync(file);
      if (options.force) {
        console.log(`覆盖旧${module}模块`);
        create(file);
        return;
      }
      console.error(`模块${module}已存在`);
    } catch (e) {
      console.log(`开始创建${module}模块`);
      create(file);
      console.log(`成功创建${module}模块`);
    }
  });

  // 删除.gitignore
  fs.unlink(`${module_dir}/.gitignore`, () => {});
};
