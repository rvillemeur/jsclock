const fs = require('fs')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    publicPath: 'dist'
  },
  devServer: {
    https: {
      key: fs.readFileSync('/home/user/devzone/ssl/server.key'),
      cert: fs.readFileSync('/home/user/devzone/ssl/server.crt'),
      ca: fs.readFileSync('/home/user/devzone/ssl/server.pem')
    },
    index: 'Clock.html',
    port: 8081
  }
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       use: {
  //         loader: 'babel-loader',
  //         options: {
  //           presets: ['@babel/preset-env']
  //         }
  //       }
  //     }
  //   ]
  // }
}
