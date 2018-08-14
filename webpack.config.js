const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const DIST_DIR = path.resolve(__dirname, "./dist");
const SRC_DIR = path.resolve(__dirname, "./src");

module.exports = {
  entry: [`${SRC_DIR}/index.tsx`],
  output: {
    path: `${DIST_DIR}`,
    filename: "js/bundle.js"
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/,
        loader: "awesome-typescript-loader" 
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/,
        loader: "source-map-loader" 
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["react", "env", "stage-2"],
              plugins: ["transform-decorators-legacy"]
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        }, "css-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          emitWarning: true,
          configFile: "./.eslintrc.js"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: "./dist/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "css/styles.css"
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  devtool: "source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "dist/"),
    host: "localhost",
    port: 9090,
    hot: true,
    inline: true,
    historyApiFallback: true
  }
};
