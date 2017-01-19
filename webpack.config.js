const LiveReloadPlugin = require('webpack-livereload-plugin');
 
module.exports = {
    entry:  "./app/index.js",
    output: {
        filename: "./public/assets/bundle.js",
        chunkFilename: "./public/assets/bundle.js",
    },
    watch: true,
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
  plugins: [
    new LiveReloadPlugin()
  ]
}
