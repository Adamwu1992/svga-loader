const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',

  entry: path.resolve(__dirname, 'index.js'),

  module: {
    rules: [
      {
        test: /\.svga$/,
        use: [{
          loader: path.resolve(__dirname, '../src'),
          options: {
            module: 'cjs'
          }
        }]
      }
    ]
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'index.html')
    })
  ]
}