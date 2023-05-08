const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: ['ejs-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'views/index.ejs',
      filename: 'index.html',
    }),
  ],
};
