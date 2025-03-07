import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default (env, argv) => {
  const isDevelopment = argv.mode !== 'production';

  return {
    mode: argv.mode || 'development',
    devtool: isDevelopment ? 'inline-source-map' : false,
    entry: {
      ui: './src/app/index.tsx',
      controller: './src/figma/controller.ts',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpg|gif|webp|svg)$/,
          loader: 'url-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'ui.html',
        chunks: ['ui'],
        cache: false,
      }),
    ],
  };
};
