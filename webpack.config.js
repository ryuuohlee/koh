const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: './client/src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    publicPath: '/',
    filename: 'koh_bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-react"
          ]
        },
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: 'file-loader',
      }
    ]
  },
  plugins: [
    //creates the index.html file for you using the template you chose
    new HtmlWebpackPlugin({
      template: './client/src/index.html'
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  ],
  devServer: {
    //opens in default browser
    open: true,
    watchContentBase: true
  },
  // resolve: {
  //   fallback: {
  //     "path": false,
  //   }
  // }
}