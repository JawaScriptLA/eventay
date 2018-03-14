module.exports = {
  entry: ['./client/src/index.js'],
  output: {
    filename: './client/public/bundle.js'
  },
  watch: true,
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