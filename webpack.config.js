const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: `${__dirname}/client/src/index.jsx`,
  output: {
    path: path.resolve(__dirname, '/client/dist'),
    publicPath: '/',
    filename: 'koh_bundle.js'
  },
  module: {
    rules: [
      {
        test: /\,jsx$/,
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
    })
  ]
}