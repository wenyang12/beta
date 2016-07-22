/**
 * 项目生成器
 */
'use strict';

const fs = require('fs');
const path = require('path');
const cwd = process.cwd(); // 返回nodejs进程的当前工作目录
const root = path.resolve(__dirname, '../'); // 返回beta运行程序的所在目录
const source = root + '/${project}'; // H5项目模板目录

function create(project, src, dest) {
  let files = fs.readdirSync(src); // 读取模板
  files.forEach(function(file) {
    let srcPath = `${src}/${file}`;
    let destPath = `${dest}/${file}`;
    let stats = fs.statSync(srcPath);

    // 是文件，拷贝文件（替换模板占位符）
    if (stats.isFile()) {
      let data = fs.readFileSync(srcPath, 'utf8');
      fs.writeFileSync(destPath, data.replace(/\$\{project\}/gi, project), 'utf8');
      console.log(`完成：${destPath}`);
      return;
    }

    // 是目录，递归拷贝
    if (stats.isDirectory()) {
      fs.mkdirSync(destPath);
      create(project, srcPath, destPath);
      console.log(`完成：${destPath}`);
    }
  });
}

exports.generate = function(project) {
  if (!/^[a-z]/.test(project)) {
    console.error('Error:项目名称必须以小写字母开头');
    process.exit(1);
  }

  if (!/^[a-z0-9\-_]+$/.test(project)) {
    console.error('Error:项目名称只能由小写字母、数字、-和_字符组成');
    process.exit(1);
  }

  let dest = `${cwd}/${project}`; // 新建项目所在目录
  try {
    fs.statSync(dest);
    console.error(`Error:${project}项目已存在`);
    process.exit(1);
  } catch (e) {
    console.log(`开始创建${project}项目`);
    fs.mkdirSync(dest);
    create(project, source, dest);
    console.log(`成功创建${project}项目`);
  }
};
