'use strict';
const fs = require('fs');
const utils = {
  /**
   * 创建React组件
   * @param  {String} component 组件名（首字母大写驼峰式命名规范）
   * @param  {String} dest      所在目标目录
   * @example
   * utils.createComponent('demo', '/home/luoying/code/dev/h5/demo/src/components')
   * utils.createComponent('demo/test', '/home/luoying/code/dev/h5/demo/src/components')
   */
  createComponent: function(component, dest) {
    let getFiles = function(cmpt) {
      let lowercase = cmpt.toLowerCase();
      return [
        {
          name: 'index.js',
          data: `module.exports = require('./${cmpt}');`
        }, {
          name: `${lowercase}.less`,
          data: "@import '~mixins/global.less';\n"
        }, {
          name: `${cmpt}.jsx`,
          data: getJSXContent(cmpt, lowercase)
        }
      ];
    };

    let files = getFiles(component.split('/').pop());
    this.mkdirSync(dest, component);
    files.forEach((file) => {
      let _file = `${dest}/${component}/${file.name}`;
      fs.writeFileSync(_file, file.data, 'utf8');
      console.log(`完成：${_file}`);
    });
  },

  // 同步逐级创建目录
  mkdirSync: function(dir, path) {
    if (!path) {
      return;
    }
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
  let content = `require('./${less}.less');
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
