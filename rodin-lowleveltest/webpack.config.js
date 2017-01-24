module.exports = {
  entry:  "./index.js",
  output: {
      filename: "./bundle.js",
      chunkFilename: "./bundle.js",
  },
  //watch: true,
  module: {
      loaders: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              loaders: ['babel-loader'],
              babelrc: true
          }
      ],
      noParse: [
        /pdfkit/
      ]
  },
  target: "web"
}
