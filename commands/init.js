/**
 * 初始化项目：git init、连接远程git仓库、添加子模块
 * 默认推导git 仓库地址，可以通过-r <url>来指定仓库地址
 */
'use strict';

const fs = require('fs');
const shell = require('shelljs');
const utils = require('../utils');
const cwd = process.cwd();
const match = cwd.match(/.*\/(\w+)\/(\w+)$/) || [];
const group = match[1]; // 组名
const project = match[2]; // 项目名
const gitlab = 'http://git.firstshare.cn';

exports.run = (options) => {
  if (!shell.which('git')) {
    utils.error('不好，你还没有安装GIT');
    process.exit(1);
  }

  console.log('git init...');
  shell.exec('git init');
  console.log('git init 完成');

  let registry = options.registry || `fe-${group}/${project}.git`;
  console.log('连接远程git仓库');
  shell.exec(`git remote add origin ${gitlab}/${registry}`);
  console.log('连接远程git仓库 完成');

  try {
    let content = fs.readFileSync(`${cwd}/.gitmodules`, 'utf8');
    // 有子模块
    content = content.replace(/[\n\t]/g, ' ');
    let reg = /path\s=\s(\w+)\s+url\s=\s([^\s]+)/g;
    let r = null;
    let submodules = [];
    while ((r = reg.exec(content))) {
      submodules.push({
        name: r[1],
        url: r[2]
      });
    }
    submodules.forEach((submodule) => {
      console.log(`添加子模块 ${submodule.name}`);
      shell.exec(`git submodule add ${submodule.url}`);
    });
    console.log('添加子模块 完成');
  } catch (e) {
    // 无子模块，忽略
    console.log('无子模块列表');
  }

  if (options.npm) {
    console.log('npm install...');
    shell.exec('npm install');
  }
};
