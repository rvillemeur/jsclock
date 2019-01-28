const fs = require('fs');

module.exports = {
  mode: 'development',
  entry: './main.js',
  output: {
    filename: 'main.js',
    publicPath: 'dist'
  },
  devServer: {
    https: true,
    https: {
      key: fs.readFileSync('C://devzone//ssl//server.key'),
      cert: fs.readFileSync('C://devzone//ssl//server.crt'),
      ca: fs.readFileSync('C://devzone//ssl//server.pem')
    },
    index: 'Clock.html',
    port: 8081
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};