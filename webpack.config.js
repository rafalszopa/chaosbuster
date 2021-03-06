const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const PurgeCssPlugin = require("purgecss-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");
const glob = require("glob");

module.exports = {
	mode: process.env.NODE_ENV,
	entry: {
		tab: "/src/pages/tab/tab.js",
		background: "/src/background.js",
	},
	output: {
		filename: process.env.NODE_ENV === "development" ? "[name].js" : "[name].js",
		path: path.join(__dirname, "/dist"),
		publicPath: "/"
	},
	resolve: {
		alias: {
			moon: process.env.NODE_ENV === "development" ? "moon/dist/moon.js" : "moon/dist/moon.js"
		},
		modules: [
			path.join(__dirname, "/src"),
			path.join(__dirname, "/node_modules")
		]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"]
						}
					},
					{ loader: "moon-loader" }
				]
			},
			{
				test: /\.scss/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// hmr: process.env.NODE_ENV === "development"
						}
					},
					{ loader: "css-loader" },
					{ loader: "sass-loader" }
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: process.env.NODE_ENV === "development" ? "images/[name].[ext]" : "images/[name].[ext]"
						}
					}
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "/src/pages/tab/index.html"),
			chunks: ["tab"],
			filename: "index.html"
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "/src/pages/popup/index.html"),
			chunks: ["popup"],
			filename: "popup.html"
		}),
		new MiniCssExtractPlugin({
			filename: process.env.NODE_ENV === "development" ? "main.css" : "main.css",
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: "./src/manifest.json" },
				{ from: "./src/static/icons", to: "./assets/icons" },
				{ from: "./src/static/images", to: "./assets/images" },
			]
		}),
		new PurgeCssPlugin({
			paths: glob.sync(path.join(__dirname, "/src/**/*"), { nodir: true })
		})
	],
	optimization: {
		minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})]
	},
	devServer: {
		hot: true,
		open: true,
		historyApiFallback: true
	},
	devtool: "cheap-source-map"
};
