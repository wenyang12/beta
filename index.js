/**
 * H5项目脚手架
 * @author luoying
 * @date 2016/7/18
 */

'use strict';

const program = require('commander');
const npm_package = require('./package');
const commands = require('./commands');

program.version(npm_package.version);
program.option('-v, --version', 'output the version number');

// 构建各命令
commands.forEach((item) => {
  let command = program.command(item.cmd);
  item.alias && command.alias(item.alias);
  item.desc && command.description(item.desc);
  if (item.options) {
    item.options.forEach((v) => {
      command.option(v.option, v.desc || '');
    });
  }
  command.action((...rest) => {
    let runner = require(`./commands/${command.name()}`);
    return runner.run && runner.run(...rest);
  });
});

// 解析输入字符串，执行对应的命令操作
program.parse(process.argv);
