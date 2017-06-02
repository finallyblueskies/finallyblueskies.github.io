var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development'
});

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  module: {
    loaders: [
      {
        //Sass
        test: /\.(scss|sass)$/,
        use: [
          'style-loader',
          'css-loader',
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
      index: 'index.html'
    }
  },
  plugins: [extractSass]
};
