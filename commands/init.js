/**
 * 初始化项目：git init、连接远程git仓库、添加子模块
 */
'use strict';

const path = require('path');
const shell = require('shelljs');
const cwd = process.cwd();
const project = path.basename(cwd);
const gitlab = 'http://git.firstshare.cn/fe-h5';
const submodules = ['libs', 'components', 'mixins', 'webpack'];

exports.run = function(options) {
  if (!shell.which('git')) {
    console.error('不好，你还没有安装GIT');
    process.exit(1);
  }

  console.log('git init...');
  shell.exec('git init');
  console.log('git init 完成');

  console.log('连接远程git仓库');
  shell.exec(`git remote add origin ${gitlab}/${project}.git`);
  console.log('连接远程git仓库 完成');

  submodules.forEach((submodule) => {
    console.log(`添加子模块 ${submodule}`);
    shell.exec(`git submodule add ${gitlab}/${submodule}.git`);
  });
  console.log('添加子模块 完成');

  if (options.npm) {
    console.log('npm install...');
    shell.exec('npm install');
  }
};
