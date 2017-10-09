const path = require('path')
const webpack = require('webpack')
const pckg = require('./package.json')
const VersionPlugin = require('./webpack.version.js')
const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

var plugins = [
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin(),
	new webpack.optimize.DedupePlugin(),
	new webpack.DefinePlugin({
		'process.env': {
			'NODE_ENV': JSON.stringify(nodeEnv),
			'VER': JSON.stringify(pckg.version)
		}
	}),

	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		minChunks: Infinity,
		filename: 'vendor.bundle.js'
	}),

	new VersionPlugin({ ver: pckg.version })
]

if ( isProd ) plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}))

const entry = isProd ? ['./src/js/index.js'] : ['webpack-hot-middleware/client', './src/js/index.js']

module.exports = {

	passPerPreset: true,
	devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',
	entry: {
		entry: entry,

		vendor: [
			'axios',
			'classnames',
			'lodash',
			'moment',
			'react',
			'react-collapse',
			'react-bootstrap',
			'react-dom',
			'react-height',
			'react-loader-advanced',
			'react-motion',
			'react-redux',
			'react-router',
			'react-router-redux',
			'react-toggle',
			'react-virtualized',
			'redux',
			'redux-form',
			'redux-storage',
			'redux-storage-engine-localstorage',
			'redux-thunk',
			'reselect'
		]
	},

	output: {
		path: path.join(__dirname, 'docs'),
		filename: 'bundle.js',
		publicPath: '/'
	},

	plugins: plugins,

	module: {
		preLoaders: [
			{ test: /\.jsx?$/, loader: 'eslint', exclude: /node_modules/ }
		],
		loaders: [{
			test: /\.(js|jsx)$/,

			loader: 'babel',
			//query: {presets: ['react', 'es2015', 'stage-0']},
			exclude: /node_modules/,
			include: __dirname
		}, {
			test: /\.less?$/,
			loaders: ['style', 'raw', 'less'],
			include: __dirname
		}, {
			test: /\.(css|scss)$/,
			loaders: ['style', 'raw', 'sass'],
			include: __dirname
		}, {
			test: /\.json$/,
			loader: 'json'
		}]

	},
	eslint: {
		configFile: './.eslintrc',
		failOnWarning: false,
		failOnError: true
	}
}
