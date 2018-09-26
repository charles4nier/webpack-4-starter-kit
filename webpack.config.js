const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    open: true
  },
  entry: {app: path.resolve(__dirname, 'src', 'app')},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader", 
            options: {
              sourceMap: true
            }
          },          
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }   
          } 
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.[hash:12].css'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(['dist'] , {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new WebpackMd5Hash(),
    new CopyWebpackPlugin([
      {
        from:'./src/assets/images',
        to:'assets/images'
      },
      {
        from:'./src/assets/fonts',
        to:'assets/fonts'
      }, 
    ])
  ]
};
