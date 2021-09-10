const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  mode: 'development',
  devtool: 'source-map',

  plugins: [
    new MiniCssExtractPlugin()
  ],
  entry: './src/index.js',

  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },

      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ],
  },

  output: {
    path: path.resolve(__dirname, '../../desktop/poweredit/pages/adminEditor'),
    filename: 'editor.js',
  },
}