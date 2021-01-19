module.exports = {
  entry: "./src/browser_action/popup.js",
  output: {
    path: `${__dirname}/src/browser_action`,
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
    ],
  },
  devtool: "source-map",
};
