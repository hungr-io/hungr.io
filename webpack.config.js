const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/main.jsx'), 
  mode: process.env.NODE_ENV,
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html' 
    })
  ],

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react'] 
          }
        }
      },
    {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
    },
    {
        test: /\.(jpg|jpeg|png|gif)$/i,
        use: ["file-loader"],
    },
    {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
    },
    ]
  },
  devServer: {
    static: {
      publicPath: '/dist',
      directory: path.resolve(__dirname, 'dist')
    },
    port: 8080,
    compress: true,
    proxy: {
      '/api': { 
        target: 'http://localhost:3000', //redirects requests to 3000 from 8080 if in dev
        pathRewrite: { '^/api': '' }, //do not call localhost:3000 directly, so make all fetch reqs to /api first
        changeOrigin: true,
      }
    },
    hot: true,
    historyApiFallback: true,
  },
  devtool: 'eval-source-map',
  performance: {
    hints: false
  },
  resolve: {
    fallback: {
      "fs": false
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.react.js'],
},
}