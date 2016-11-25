// https://github.com/shelljs/shelljs
require('shelljs/global')

var path = require('path')
var ora = require('ora')
var webpack = require('webpack')
var opn = require('opn')
var fs = require('fs');
var rimraf = require('rimraf')

var preConfig = require('./pre.config')
var webpackConfig = require('../config/webpack.procduct-H5.config')
var dirVars = require('../config/base/dir-vars.config.js')

var outStr = '构建发布文件...'
var spinner = ora(outStr)

rimraf(dirVars.buildDir, fs, function cb() {
  console.log('build目录已清空')
  spinner.start()
})
cp('-R', 'static/', dirVars.buildDir)


//或拷贝到Hbuilder中使用
console.log(
  '  Tip:' +
  '  可以用文件路径打开访问\n'
)

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    hash: false,
    version: false,
    timings: false,
    chunkModules: false
  }) + '\n')

  // 删除指定路径下html和static目录, 并将生成的文件复制到指定路径
  var copyPath = preConfig.copyPath || ''
  if (copyPath !== '') {
    rm('-rf', copyPath + '\\html')
    rm('-rf', copyPath + '\\static');
    cp('-R', path.resolve(dirVars.buildDir, '\html'), copyPath)
    cp('-R', path.resolve(dirVars.buildDir, '\static'), copyPath)
    console.log("清理并复制文件到指定路径：" + copyPath);
    opn(copyPath, {
      wait: false
    });
  }

})