const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
//const DefinePlugin = require('webpack-Define-plugin');

module.exports = {
    
  entry: {
      bundle:['babel-polyfill', './src/index.js'],
  },
  
  output: {
    filename: '[name]_[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  devtool:'inline-source-map',

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '0.0.0.0',
    port: '7777',
    publicPath: '/'
  },
  
  module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            use: [
                'babel-loader',
                'eslint-loader'
            ],
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                { loader: 'css-loader', options: { importLoaders: 1 } },
                'postcss-loader'
            ]
        },
        {
            test: /\.scss$/,
            use: [
                'style-loader',
                { loader: 'css-loader', options: { importLoaders: 2 } },
                'postcss-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.(png|jpg|jpeg|ico|svg|bmp|gif)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192, // go to file-loader over 8k
                        name: '[name]-[hash].[ext]',
                        fallback: 'file-loader'
                    }
                }
            ]
        },
        // {
        //     test: /\.(png|jpg|jpeg|ico|svg|bmp|gif)$/,
        //     use: [
        //         {
        //             loader: 'file-loader',
        //             options: {
        //                 name: '[name]-[hash].[ext]'
        //             }
        //         }
        //     ]
        // },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                'file-loader'
            ]
        },
        {
            test: /\.(csv|tsv)$/,
            use: [
                'csv-loader'
            ]
        },
        {
            test: /\.xml$/,
            use: [
                'xml-loader'
            ]
        }
    ]
  },

  plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
          title:'React-dev-template'
      }),
      //new UglifyJSPlugin(),
      new BundleAnalyzerPlugin(),
      new HtmlWebpackPlugin({
          hash: true,
          title: 'React Dev Template',
          filename: path.resolve(__dirname, 'dist/index.html'),
          template: path.resolve(__dirname, 'src/index-template.html'),
      }),
    ]
};