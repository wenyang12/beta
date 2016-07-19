/**
 * 构建项目，打包测试或生产环境代码
 */
'use strict';

const shell = require('shelljs');
exports.run = function(env) {
  env = env || 'www';
  console.log(`开始构建代码，环境：${env}`);
  shell.exec(`npm run product -- --env=${env}`);
  console.log('构建代码完成');
};
