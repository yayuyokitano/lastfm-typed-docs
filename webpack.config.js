var path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./src/main.tsx",
  output: {
    filename: "bundle.js",
		publicPath: '/',
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "buffer": require.resolve("buffer"),
      "stream": require.resolve("stream-browserify"),
    }
  },
  devtool: "source-map", //remove for production
  module: {
    rules: [
      { test: /\.scss$/, use: [ "style-loader", "css-loader", "sass-loader" ] },
      { test: /\.tsx?$/, exclude: /(node_modules|bower_components)/, loader: "babel-loader" },
      { test: /\.tsx?$/, loader: "ts-loader" }, //remove for production
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
	devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
		publicPath:'/',
		historyApiFallback: true,
  },
	plugins: [
    new HtmlWebpackPlugin({
			template: 'public/index.html',
		})
  ],
};