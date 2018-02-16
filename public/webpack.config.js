'use strict';


//-------------------------------------------------------------
// PRODUCTION SETTINGS
//-------------------------------------------------------------
const {DefinePlugin, EnvironmentPlugin} = require('webpack');

// david - commented out in case I want to use production vars later
// require('dotenv').config();
// const CleanPlugin = require('clean-webpack-plugin');
// const UglifyPlugin = require('uglifyjs-webpack-plugin'); 
// --------------------------------------------------


const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webPackConfig = module.exports = {};

// david - commented out in case I want to use production variable later
// const PRODUCTION = process.env.NODE_ENV === 'production';

const path = require('path')

// --------------------------------------------------
webPackConfig.entry = `${__dirname}/src/main.js`;
webPackConfig.output = {
  filename : 'bundle.[hash].js',
  path : `${__dirname}/build`,
};

// --------------------------------------------------
webPackConfig.plugins = [
  new HTMLPlugin( {
    title : 'Star Wars Search',
    template : `${__dirname}/src/index.html`,
  } ),
  // new EnvironmentPlugin([ 'NODE_ENV' ]),
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

// --------------------------------------------------
webPackConfig.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'styles.css',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_module/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
          ]
        })
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
  
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css')
  ]
}

// --------------------------------------------------
webPackConfig.devtool = PRODUCTION ? undefined : 'eval-source-map';

webPackConfig.devServer = {
  historyApiFallback: true,
};