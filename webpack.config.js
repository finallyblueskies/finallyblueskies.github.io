var webpack = require('webpack');
var path = require('path');
var pjson = require('./package.json');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ClosureCompilerPlugin = require('webpack-closure-compiler');

var extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development'
});

var plugins = [
  extractSass,
  new BundleAnalyzerPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.bundle.js'
  })
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ClosureCompilerPlugin({
      compiler: {
        language_in: 'ECMASCRIPT6',
        language_out: 'ECMASCRIPT5',
        compilation_level: 'SIMPLE'
      },
      concurrency: 3
    })
  );
}

module.exports = {
  entry: {
    app: './src/index.js',
    vendor: Object.keys(pjson.dependencies)
  },
  devtool: process.env.NODE_ENV === 'production' ? 'inline-source-map' : false,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        //Sass
        test: /\.(scss|sass)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              data: '@import "config";',
              includePaths: [path.join(__dirname, 'src')]
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=dist/fonts/[name].[ext]'
      },
      {
        //Buble
        test: /.js$/,
        loaders: 'buble-loader',
        include: path.join(__dirname, 'src'),
        query: {
          objectAssign: 'Object.assign'
        }
      }
    ]
  },
  //Port, route all requests
  //into index.html
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'dist/index.html'
    }
  },
  plugins: plugins
};
