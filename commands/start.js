/**
 * 启动webpack编译，开始开发进程
 */
'use strict';

const shell = require('shelljs');
exports.run = () => {
  console.log('开启项目编译进程');
  shell.exec('npm run dev');
};
