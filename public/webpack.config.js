'use strict';

//-------------------------------------------------------------
// PRODUCTION SETTINGS
//-------------------------------------------------------------
require('dotenv').config();
const {DefinePlugin, EnvironmentPlugin} = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
//-------------------------------------------------------------

const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webPackConfig = module.exports = {};

const PRODUCTION = process.env.NODE_ENV === 'production';

// const extractSass = new ExtractTextPlugin({
//   filename: 'style.css',
//   disable: true,
//   allChunks: true,
// });

//-------------------------------------------------------------
webPackConfig.entry = `${__dirname}/src/main.js`;
webPackConfig.output = {
  filename : 'bundle.[hash].js',
  path : `${__dirname}/build`,
  // publicPath : process.env.CDN_URL,
};
//-------------------------------------------------------------
webPackConfig.plugins = [
  new HTMLPlugin( {
    title : 'Star Wars Search',
    template : `${__dirname}/src/index.html`,
  } ),
  new EnvironmentPlugin([ 'NODE_ENV' ]),
  new DefinePlugin({
    __API_URL__ : JSON.stringify(process.env.API_URL),
  }),
  new ExtractTextPlugin('bundle.[hash].css'),
];

if(PRODUCTION) {
  webPackConfig.plugins = webPackConfig.plugins.concat([
    new UglifyPlugin(),
    new CleanPlugin(),
    // extractSass,
  ]);
}
//-------------------------------------------------------------
webPackConfig.module = {
  rules : [
    {
      test: /\.js$/,
      exclude: /node_module/,
      loader: 'babel-loader',
    },
    {
      test: /\.(scss|sass)$/, 
      loader: ExtractTextPlugin.extract({
        use : [
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap : true,
              includePaths: [`${__dirname}/src/style`],
            },
          },
        ],
      }),
    },
    // {
    //   test: /\.js$/,
    //   exclude: /(node_modules|bower_components)/,
    //   use: {
    //     loader: 'babel-loader',
    //     options: {
    //       presets: ['env', 'react'],
    //     },
    //   },
    // },
    // {
    //   test: /\.(css|sass|scss)$/,
    //   use: extractSass.extract({
    //     fallback: 'style-loader',
    //     use: ['css-loader', 'sass-loader'],
    //   }),
    // },
    {
      test: /\.(jpg|gif|png|svg)$/,
      exclude: /\.icon\.svg$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'image/[name].[hash].[ext]',
        },
      }],
    },
    {
      test: /\.(woff|woff2|ttf|eot).*/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'font/[name].[hash].[ext]',
          },
        },
      ],
    },
  ],
};
//-----------------------------------------
webPackConfig.devtool = PRODUCTION ? undefined : 'eval-source-map';

webPackConfig.devServer = {
  historyApiFallback: true,
};