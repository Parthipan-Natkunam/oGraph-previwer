const CopyPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/browser_action/popup.js",
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./manifest.json", to: `${__dirname}/dist/manifest.json` },
        { from: "./icons", to: `${__dirname}/dist/icons` },
        {
          from: "./src/browser_action/browser_action.html",
          to: `${__dirname}/dist/browser_action.html`,
        },
        {
          from: "./src/browser_action/popup.css",
          to: `${__dirname}/dist/popup.css`,
        },
      ],
    }),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [["optipng", { optimizationLevel: 5 }]],
      },
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new HtmlMinimizerPlugin(),
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
  },
  output: {
    path: `${__dirname}/dist`,
    filename: "bundle.js",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,

        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.png$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  // devtool: "source-map",
};
