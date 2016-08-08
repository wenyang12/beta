'use strict';

let args = process.argv;
const DEBUG = args.indexOf('--debug') >= 0;

let baseConfig = require(`./webpack/webpack.${DEBUG ? 'config' : 'product'}`);
module.exports = baseConfig({
  app: '${h5}',
  htmls: [{
    html: 'index.html',
    chunk: 'index'
  }]
});
