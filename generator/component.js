/**
 * 生成React组件
 * 支持在父组件下创建子组件，调用方式：beta generate component parent/child
 */
'use strict';

const fs = require('fs');
const utils = require('../utils');
const cwd = process.cwd();

exports.generate = function(components, options) {
  if (!components || !components.length) {
    console.error('Error:至少指定一个组件');
    process.exit(1);
  }

  // 根据全局公共组件参数来决定组件应该生成在何处
  let dir = cwd + (options.global ? '/components' : '/src/components');
  components.forEach((component) => {
    if (!/^[A-Z]/.test(component)) {
      console.error('Error:组件名称必须已大写字母开头(JSX组件规范)');
      process.exit(1);
    }

    if (!/^[a-zA-Z0-9]+$/.test(component)) {
      console.error('Error:组件名称只能由英文字母和数字组成');
      process.exit(1);
    }
    
    try {
      fs.statSync(`${dir}/${component}`);
      if (options.force) {
        console.log(`覆盖旧${component}组件`);
        utils.createComponent(component, dir);
        return;
      }
      console.error(`Error:${component}组件已存在`);
    } catch (e) {
      console.log(`开始创建${component}组件`);
      utils.createComponent(component, dir);
      console.log(`成功创建${component}组件`);
    }
  });

  // 删除.gitignore
  fs.unlink(`${dir}/.gitignore`, () => {});
};
