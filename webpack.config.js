var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require("zlib")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  mode: "production",
  entry: "./src/main.tsx",
  output: {
    filename: "bundle.js",
		publicPath: '/lastfm-typed/',
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
			{ test: /\.png/, type: 'asset/resource' },
      {
				test: /\.(js|jsx|tsx|ts)$/,
				exclude: /(node_modules|bower_components)/,
				loader: "babel-loader",
				options: {
					presets: [
						["@babel/preset-env", {
							corejs: 3,
							targets: "last 2 versions, not dead",
							useBuiltIns: "usage"
						}],
						"@babel/preset-typescript",
						"@babel/preset-react"
					],
					plugins: [
						"@babel/plugin-syntax-dynamic-import"
					]
				}
			},
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
	devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
		publicPath:'/lastfm-typed/',
		historyApiFallback: true,
  },
	optimization: {
    minimizer: [new TerserPlugin({})],
  },
	plugins: [
    new HtmlWebpackPlugin({
			template: 'public/index.html',
		}),
    new CompressionPlugin({
      filename: "[path][base].br",
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),
		new BundleAnalyzerPlugin()
  ],
};