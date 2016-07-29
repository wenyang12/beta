/**
 * H5项目脚手架
 * @author luoying
 * @date 2016/7/18
 */

'use strict';

const fs = require('fs');
const path = require('path');
const program = require('commander');
const npm_package = require('./package');
const yaml = require('js-yaml');
const utils = require('./utils');
const yamlFile = path.resolve(__dirname, './commands.yml');
const commands = yaml.safeLoad(fs.readFileSync(yamlFile, 'utf8'));

program.version(npm_package.version);
program.option('-v, --version', 'output the version number');

// 构建各命令
commands.forEach((item) => {
  let command = program.command(item.cmd);
  item.alias && command.alias(item.alias);
  item.desc && command.description(item.desc);
  if (item.options) {
    item.options.forEach((v) => command.option(v.option, v.desc || ''));
  }
  command.action(function() {
    let runner = require(`./commands/${command.name()}`);
    return runner.run && runner.run.apply(null, arguments);
  });
});

program
  .command('*')
  .action((cmd) => utils.error(`${cmd}命令不存在`));

// 解析输入字符串，执行对应的命令操作
program.parse(process.argv);
