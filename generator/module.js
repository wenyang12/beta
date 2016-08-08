/**
 * 生成业务模块（非UI组件）
 */
'use strict';

const fs = require('fs');
const utils = require('../utils');
const cwd = process.cwd();
let module_dir = `${cwd}`;

exports.generate = (modules, options) => {
  if (!modules || !modules.length) {
    utils.error('至少指定一个模块');
    process.exit(1);
  }

  let type = options.type;
  let match = cwd.match(/.*\/(\w+)\/(\w+)$/) || [];
  if (!options.type) type = match[1];

  if (!type) {
    utils.error('未知项目类型，请指定`type`选项');
    process.exit(1);
  }

  module_dir += {
    h5: '/src/modules',
    app: `/${match[2]}/modules`
  }[type];

  modules.forEach((module) => {
    if (!/^[a-z]/.test(module)) {
      utils.error('模块名称必须以小写字母开头');
      process.exit(1);
    }

    if (!/^[a-z0-9\-_\/]+$/.test(module)) {
      utils.error('模块名称只能由小写字母、数字、-、_和/字符组成');
      process.exit(1);
    }

    let ms = module.split('/');
    if (ms.length > 1) {
      // 携带目录，先生成目录
      let path = ms.slice(0, ms.length - 1).join('/');
      utils.mkdirSync(module_dir, path);
    }

    let file = `${module_dir}/${module}.js`;
    let code = {
      h5: 'module.exports = null;',
      app: `define(function(require, exports, module) {
  module.exports = null;
});`
    }[type];
    let create = (file) => (fs.writeFileSync(file, code, 'utf8'));
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
