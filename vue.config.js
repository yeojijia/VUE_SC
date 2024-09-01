"use strict";
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const path = require("path");
const Timestamp = new Date().getTime();
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.html$|\.css/, // 匹配的文件名
        threshold: 10240, // 文件超过10k，进行gzip压缩
        minRatio: 0.8,
        deleteOriginalAssets: false, // 是否删除原文件
      }),
    ],
  },
  chainWebpack: config => {

    if (['production', 'test', 'pre'].includes(process.env.NODE_ENV)) {
      // webpack 会默认给commonChunk打进chunk-vendors，所以需要对webpack的配置进行delete
      config.optimization.delete('splitChunks')
      // 删除prefetch
      config.plugins.delete('prefetch')
      // 删除console
      config.optimization.minimizer('terser').tap(options => {
        options[0].terserOptions.compress.drop_console = false
        return options
      })
      // config.plugin('ignore').use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)) //忽略/moment/locale下的所有文件

      // 代码分割
      config.optimization.splitChunks({
        chunks: 'all', // 将对什么类型的代码进行分割，三种值：all: 全部 ｜ async: 异步，按需加载的代码 ｜ initial: 入口代码块
        minSize: 30000, // 字节 引入的文件大于30kb才进行分割
        minChunks: 1, // 模块至少使用次数
        maxInitialRequests: 10, // 首页加载的时候引入的文件最多5个
        cacheGroups: {
          // 定义 libs 缓存组，分割从 node_modules 中引入的代码
          vendors: {
            name: 'chunk-vendors', // 分割成的文件名
            test: /[\\/]node_modules[\\/]/, // 匹配 node_modules 中模块
            priority: -20 // 优先级，当模块同时命中多个缓存组的规则时，分配到优先级高的缓存组
          },
          default: { //所有代码分割快都符合默认值，此时判断priority优先级
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true // 允许在模块完全匹配时重用现有的块，而不是创建新的块。
          },
          vant: {
            name: 'chunk-vant',
            priority: 20, // 优先级 20，命中 vant 代码时，优先分割到此组里
            test: /[\\/]node_modules[\\/]_?vant(.*)/ // 匹配 vant 代码
          },
          moment: {
            name: 'chunk-moment',
            priority: 20, // 优先级 20，命中 moment 代码时，优先分割到此组里
            test: /[\\/]node_modules[\\/]_?moment(.*)/ // 匹配 moment 代码
          },
          vue: {
            name: 'chunk-vue',
            priority: 20, // 优先级 20，命中 lodash 代码时，优先分割到此组里
            test: /[\\/]node_modules[\\/]_?vue(.*)/ // 匹配 lodash 代码
          },
          qs: {
            name: 'chunk-qs',
            priority: 20, // 优先级 20，命中 lodash 代码时，优先分割到此组里
            test: /[\\/]node_modules[\\/]_?qs(.*)/ // 匹配 lodash 代码
          },
          md5: {
            name: 'chunk-md5',
            priority: 20, // 优先级 20，命中 lodash 代码时，优先分割到此组里
            test: /[\\/]node_modules[\\/]_?js-md5(.*)/ // 匹配 lodash 代码
          },
          echarts: {
            name: 'chunk-echarts',
            priority: 20, // 优先级 20，命中 lodash 代码时，优先分割到此组里
            test: /[\\/]node_modules[\\/]_?echarts(.*)/ // 匹配 lodash 代码
          }
        }
      })

      config.module
        .rule('font-ttf')
        // .test(/\.(woff2?|eot|ttf|otf|ttc)(\?.*)?$/) 
        .test(/\.(ttc)(\?.*)?$/)
        .use('url-loader')
        .loader('url-loader')
        .options({
          limit: 20000,
          name: `fonts/[name]-[hash:7].${Timestamp}.[ext]`, //`fonts/[name]-[hash].[ext]`,
          outputPath: 'fonts/',
          esModule: false,
        })
        .end();
      config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js')
      // 修改js，js chunk文件输出目录
      config.output.filename(`js/[name]-[hash:7].${Timestamp}.js`).chunkFilename(`js/[name]-[contenthash:7].${Timestamp}.chunk.js`)
    }




  },
  devServer: {
    port: '8889',
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({ // 把px单位换算成rem单位
            rootValue: 37.5, // vant官方使用的是37.5
            // selectorBlackList: ['default', 'mu'], // 忽略转换正则匹配项
            propList: ['*'],
            exclude: function (file) {
              return file.indexOf('mobile') == -1
            }
          })
        ]
      }
    }
  },
};

