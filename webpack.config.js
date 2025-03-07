const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('inline-chunk-html-plugin');

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',
  devtool: argv.mode === 'production' ? false : 'inline-source-map',
  entry: {
    code: './src/figma/controller.ts',
    ui: './src/app/index.tsx',
  },
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        use: [
          'ts-loader'
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      filename: 'ui.html',
      chunks: ['ui'],
      cache: false,
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/.*/]),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  output: {
    filename: '[name].js?[contenthash]',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
});
