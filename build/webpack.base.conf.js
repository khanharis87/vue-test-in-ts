var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.ts'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.scss','.ts', '.js', '.vue', '.vue.ts','.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@sections': resolve('src/components/sections'),
      '@layouts': resolve('src/components/layouts'),
      '@functionals': resolve('src/components/functionals'),
      '@classes': resolve('src/classes'),
      '@interfaces': resolve('src/interfaces'),
      '@icons': resolve('src/assets/svg/icons'),
      '@logos': resolve('src/assets/svg/logos'),
      '@spinners': resolve('src/assets/svg/spinners'),
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [resolve('src')],
        options: vueLoaderConfig
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        include: [resolve('src'), resolve('test')],
        exclude: ['/node_modules'],
        options: {
          /** TS don't support importing *.vue files (Can't find module error).
          And hack with suffixing *.vue with ".ts" at compile-time is way what use ts-loader **/
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.ts$/,
        enforce: 'pre',
        include: [resolve('src')],
        loader: 'tslint-loader',
        options: { /* Loader options go here */ }
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        include: [resolve('src')],
        options: {
          limit: 10000,
          name: utils.assetsPath('icons/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        include: [resolve('src')],
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[yar]')
        }
      },
      {
        test: /\.svg$/,
        use: [
          'svg-sprite-loader'
        ]
      }
    ]
  }
}
