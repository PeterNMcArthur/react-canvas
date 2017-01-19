module.exports = {
    entry:  "./app/index.js",
    output: {
        filename: "./electron/bundle.js",
        chunkFilename: "./electron/bundle.js",
    },
    module: {
        loaders: [
					{ 
						test: /\.json$/, 
						loader: 'json' 
					},
					{
						test: /\.(js|jsx)$/,
						exclude: /node_modules/,
						loaders: ['babel-loader'],
						babelrc: true
					}
				]
		},
		target: 'electron'
}
