// vue.config.js
const webpack = require('webpack');
module.exports = {
  publicPath:"/",  // 可以设置成相对路径，这样所有的资源都会被链接为相对路径，打出来的包可以被部署在任意路径
  outputDir:"pro",  //打包时生成的生产环境构建文件的目录
  assetsDir: 'public',  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  configureWebpack: {
    plugins: [
          new webpack.ProvidePlugin({
              $: 'jquery',            //全局单独$符号使用jqery
              jQuery: 'jquery',
              'window.jQuery': 'jquery',
              'root.jQuery': 'jquery'
          })
      ],
  },
  devServer: {
      overlay: {
          warnings: false,
          errors: false
      },
  },
  lintOnSave: false
}