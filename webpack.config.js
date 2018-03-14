module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: './client/public/bundle.js'
  },
  watch: true,
  devtool: options.devTool,
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env']
        }
      }
    ]
  }
};