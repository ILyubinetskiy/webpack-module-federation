/* eslint-disable no-undef */
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { ModuleFederationPlugin } = require('webpack').container;
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');
const deps = require("../package.json").dependencies;

const isDev = process.env.NODE_ENV === 'development';
const mode = isDev ? 'development' : 'production';
console.log('mode is ', mode);

const getPlugins = () => {
  const base = [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new ModuleFederationPlugin({
      name: "webpack_module_federation",
      filename: "remoteEntry.js",
      remotes: {
        styled_components: "styled_components@http://localhost:3002/remoteEntry.js"
      },
      exposes: {
        "./store": path.resolve(__dirname, '../src/store/storeShared')
      },
      shared: {
        ...deps,
        react: {
          eager: true,
          singleton: true,
          requiredVersion: deps.react
        },
        "react-dom": {
          eager: true,
          singleton: true,
          requiredVersion: deps["react-dom"]
        }
      }
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../src/index.html')
    })
  ];

  if (!isDev) {
    base.push(new BundleAnalyzerPlugin());
  }

  return base;
};

const getOptimization = () => {
  const config = {
    // splitChunks: {
    //   chunks: 'all'
    // }
  };

  if (!isDev) {
    config.minimizer = [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ];
  }

  return config;
};

module.exports = {
  mode,
  devtool: isDev ? 'source-map' : 'eval',
  entry: {
    main: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    filename: '[name].[contenthash].js',
    clean: true,
    path: path.resolve(__dirname, '../dist'),
    publicPath: "http://localhost:4200/"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json", '.css'],
    alias: {
      '@@components': path.resolve(__dirname, '../src/components'),
      '@@constants': path.resolve(__dirname, '../src/constants'),
      '@@store': path.resolve(__dirname, '../src/store'),
      '@@interfaces': path.resolve(__dirname, '../src/interfaces')
    }
  },
  devServer: {
    port: 4200
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/images/[hash][ext][query]'
        }
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[hash][ext][query]'
        }
      },
      {
        test: /\.svg/,
        type: 'asset/inline'
      },
      {
        test: /\.txt$/,
        type: 'asset/source'
      },
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  },

  plugins: getPlugins(),
  optimization: getOptimization()
};
