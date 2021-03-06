var webpack = require('webpack')
var pluginsConfig = require('./inherit/plugins.config.js')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path');
var dirVars = require('./base/dir-vars.config.js')

var pageArr = require('./base/page-entries.config.js')
var entries = require('./entry.dev.config')

// 环境参数
pluginsConfig.push(new webpack.DefinePlugin({
  IS_PRODUCTION: false,
}))
if (process.platform != 'win32') {
  var Dashboard = require('webpack-dashboard')
  var DashboardPlugin = require('webpack-dashboard/plugin')
  var dashboard = new Dashboard()
  pluginsConfig.push(new DashboardPlugin(dashboard.setData))
}

// 配置提取出的样式文件
// pluginsConfig.push(new ExtractTextPlugin('css/[name].[hash:3].css'))

pluginsConfig.push(new webpack.optimize.OccurenceOrderPlugin())
pluginsConfig.push(new webpack.HotModuleReplacementPlugin())
pluginsConfig.push(new webpack.NoErrorsPlugin())


pageArr.forEach((page) => {
  var ext = '.html'
  var basename = 'template' + ext
    // if (path.extname(page).toLowerCase() === ext) {
  if (path.basename(page) === basename) {
    var _page = page.replace('\/' + basename, '').replace('\/', '_')
    var conf = {
      filename: 'html/' + _page + '.html',
      template: path.resolve(dirVars.pagesDir, `./${page}`), // 模板路径
      inject: true // js插入位置
    }
    if (_page in entries) {
      conf.chunks = ['base', _page]
        //是否加hash参数: 例如 *.js?fdlfjdlfjdl245
      conf.hash = true;
    }
    pluginsConfig.push(new HtmlWebpackPlugin(conf))
  }

})

module.exports = pluginsConfig
