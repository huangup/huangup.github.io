var config = require('./webpack.config');
var webpack = require("webpack");
var WebpackDevServer = require('webpack-dev-server');
var compile = webpack(config);
compile.plugin('compilation', function( compilation, callbak) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callbak) {
        callbak()
    })
})

var server = new WebpackDevServer(compile,{
    contentBase: './build',
    hot: true,
    inline: true, /*无效*/
    historyApiFallback: true
});
server.listen(8080);