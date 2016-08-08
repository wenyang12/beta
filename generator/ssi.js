/**
 * 生成SSI
 */
'use strict';

const fs = require('fs');
const utils = require('../utils');
const cwd = process.cwd(); // 返回nodejs进程的当前工作目录
const ssi_dir = `${cwd}/ssi`; // ssi所在目录

const create = (ssi, dest, js) => {
  let files = [{
    name: `${ssi}.html`,
    data: js ? `<script src="./${ssi}.js"></script>` : ''
  }, {
    name: `${ssi}.less`,
    data: `.w-${ssi} {}`
  }];
  if (js) {
    files.push({
      name: `${ssi}.js`,
      data: '!(function(){});'
    });
  }
  utils.mkdirSync(dest, ssi);
  files.forEach((file) => {
    let _file = `${dest}/${ssi}/${file.name}`;
    fs.writeFileSync(_file, file.data, 'utf8');
    console.log(`完成：${_file}`);
  });
};

exports.generate = (ssis, options) => {
  if (!ssis || !ssis.length) {
    utils.error('至少指定一个ssi');
    process.exit(1);
  }

  ssis.forEach((ssi) => {
    try {
      fs.statSync(`${ssi_dir}/${ssi}`);
      if (options.force) {
        console.log(`覆盖旧${ssi}ssi`);
        create(ssi, ssi_dir, options.js);
        return;
      }
      utils.error(`${ssi}ssi已存在`);
    } catch (e) {
      console.log(`开始创建${ssi}ssi`);
      create(ssi, ssi_dir, options.js);
      console.log(`成功创建${ssi}ssi`);
    }
  });

  // 删除.gitignore
  fs.unlink(`${ssi_dir}/.gitignore`, () => {});
};
