'use strict';
const fs = require('fs');
const utils = {
  /**
   * 首字母大写
   * @param  {String} s
   * @return {String}
   * @example
   * utils.capitalize('abcd');
   * // => Abcd
   */
  capitalize: function(s) {
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  },

  /**
   * 创建React组件
   * @param  {String} component 组件名
   * @param  {String} dest      所在目标目录
   * @example
   * utils.createComponent('demo', '/home/luoying/code/dev/h5/demo/src/components')
   * utils.createComponent('demo/test', '/home/luoying/code/dev/h5/demo/src/components')
   */
  createComponent: function(component, dest) {
    let capitalize = utils.capitalize(component);
    let getFiles = function(component) {
      return [{
        name: 'index.js',
        data: `module.exports = require('./${capitalize}');`
      }, {
        name: `${component}.less`,
        data: "@import '~mixins/global.less';\n"
      }, {
        name: `${capitalize}.jsx`,
        data: getJSXContent(capitalize, component)
      }];
    };

    let files = getFiles(component.split('/').pop());
    this.mkdirSync(dest, capitalize);
    files.forEach((file) => {
      let _file = `${dest}/${capitalize}/${file.name}`;
      fs.writeFileSync(_file, file.data, 'utf8');
      console.log(`完成：${_file}`);
    });
  },

  // 逐级创建目录
  mkdir: function(path, callback) {
    if (!path) return;
    let paths = path.split('/');
    let index = 0;
    let mk = function(p, next) {
      if (index > paths.length) {
        return callback && callback();
      }
      fs.stat(p, (err) => {
        if (err) {
          fs.mkdir(p, () => {
            next(p + '/' + paths[index++], mk);
          });
          return;
        }
        next(p + '/' + paths[index++], mk);
      });
    };
    mk(paths[index++], mk);
  },

  // 同步逐级创建目录
  mkdirSync: function(dir, path) {
    if (!path) return;
    let paths = path.split('/');
    for (let i = 0; i < paths.length; i++) {
      dir += '/' + paths[i];
      try {
        fs.statSync(dir);
      } catch (e) {
        fs.mkdirSync(dir);
      }
    }
  }
};

function getJSXContent(name, less) {
  let content =
    `require('./${less}.less');
const React = require('react');\n
const ${name} = React.createClass({
  render() {
    return (
      <div />
    );
  }
});\n
module.exports = ${name};`;
  return content;
}
module.exports = utils;
