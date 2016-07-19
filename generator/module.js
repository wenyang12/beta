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
    fs.writeFileSync(`${module_dir}/${module}.js`, 'module.exports = null;', 'utf8');
  });

  // 删除.gitignore
  fs.unlink(`${module_dir}/.gitignore`, () => {});
};
