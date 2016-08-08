require('assets/style/reset.css');
require('./index.less');

// 初始化App的相关模块引入
require('libs/fastclick-attach');
require('libs/touchmove-preventdefault');
require('libs/touch-scroll');

// 引入数据采集模块
let collector = require('libs/collector');
collector.config('${h5}');

// App初始化准备就绪
let ready = require('libs/appready');
ready('${h5}', null, () => {
  let React = require('react');
  let ReactDOM = require('react-dom');
  let Router = require('react-router').Router;
  let Route = require('react-router').Route;
  let IndexRoute = require('react-router').IndexRoute;

  const App = React.createClass({
    render: function() {
      return (
        <section className="${h5}-app">
          {this.props.children}
        </section>
      );
    }
  });

  ReactDOM.render(
    <Router>
      <Route path="/" component={App}>
        <IndexRoute component={} />
      </Route>
    </Router>,
    document.getElementById('${h5}Container')
  );
});
