require('assets/style/reset.css');
require('./index.less');

// 初始化App的相关模块引入
require('libs/fastclick-attach');
require('libs/network');

// 引入数据采集模块
let collector = require('libs/collector');
collector.config('${h5}');

let $ = require('zepto');
let device = require('libs/device');

let platform = device.ios ? 'ios' : (device.android ? 'android' : 'pc');
let root = document.getElementById('fxiaoke');
$(root).addClass(platform).addClass(device.app ? 'app' : '');

// App初始化准备就绪
let ready = require('libs/appready');
ready('${h5}', null, () => {
  let React = require('react');
  let ReactDOM = require('react-dom');
  let ReactRouter = require('react-router');
  let Router = ReactRouter.Router;
  let Route = ReactRouter.Route;
  let IndexRoute = ReactRouter.IndexRoute;

  const App = React.createClass({
    render() {
      return this.props.children;
    }
  });

  ReactDOM.render(
    <Router history={ReactRouter.HashHisotry}>
      <Route path="/" component={App}>
        <IndexRoute component={} />
      </Route>
    </Router>,
    document.getElementById('${h5}Container')
  );
});
