/**
 * 项目生成器
 */
'use strict';

const fs = require('fs');
const path = require('path');
const utils = require('../utils');
const types = ['h5', 'app'];
const cwd = process.cwd(); // 返回nodejs进程的当前工作目录
const root = path.resolve(__dirname, '../'); // 返回beta运行程序的所在目录
const sources = {
  h5: `${root}/\${h5}`, // H5项目模板目录
  app: `${root}/\${app}` // App项目模板目录
};

const create = (project, type, src, dest) => {
  let reg = new RegExp(`\\$\\{${type}\\}`, 'gi');
  let files = fs.readdirSync(src); // 读取模板
  files.forEach((file) => {
    let srcPath = `${src}/${file}`;
    let destPath = `${dest}/${file.replace(reg, project)}`;
    let stats = fs.statSync(srcPath);

    // 是文件，拷贝文件（替换模板占位符）
    if (stats.isFile()) {
      let data = fs.readFileSync(srcPath, 'utf8');
      fs.writeFileSync(destPath, data.replace(reg, project), 'utf8');
      console.log(`完成：${destPath}`);
      return;
    }

    // 是目录，递归拷贝
    if (stats.isDirectory()) {
      fs.mkdirSync(destPath);
      create(project, type, srcPath, destPath);
      console.log(`完成：${destPath}`);
    }
  });
}

exports.generate = (project, type) => {
  if (!project) {
    utils.error('必须指定项目名称');
    process.exit(1);
  }

  if (!type) type = path.basename(cwd);

  if (!/^[a-z]/.test(project)) {
    utils.error('项目名称必须以小写字母开头');
    process.exit(1);
  }

  if (!/^[a-z0-9\-_]+$/.test(project)) {
    utils.error('项目名称只能由小写字母、数字、-和_字符组成');
    process.exit(1);
  }

  if (types.indexOf(type) === -1) {
    utils.error(`项目类型只能是${types.join(' ')}其中之一`);
    process.exit(1);
  }

  let source = sources[type];
  let dest = `${cwd}/${project}`; // 新建项目所在目录
  try {
    fs.statSync(dest);
    utils.error(`${project}项目已存在`);
    process.exit(1);
  } catch (e) {
    console.log(`开始创建${project}项目`);
    fs.mkdirSync(dest);
    create(project, type, source, dest);
    console.log(`成功创建${project}项目`);
  }
};
