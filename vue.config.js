const { defineConfig } = require('@vue/cli-service')
const webpack = require("webpack");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      // 配置 jQuery 插件的参数
      new webpack.ProvidePlugin({
        // 引入jquery
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        // 引入popper.js
        Popper: ['popper.js', 'default']
      })
    ]
  },
  devServer:{
    proxy:{
      '/api':{
        target:"https://43.139.40.29:5000",
        changeOrigin:true,
        pathRewrite:{
          '^/api':'/api'
        }
      }
    },
    port:80
  }
}
)



