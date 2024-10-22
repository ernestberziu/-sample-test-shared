const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        loader: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
        options: {
          configFile: path.resolve(__dirname, 'jsconfig.styles.json'),
        },
      },
      {
        test: /\.s?css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          { loader: 'resolve-url-loader' },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: 'compressed',
              },
            },
          },
        ],
      },
      {
        include: [path.resolve(__dirname, 'src/assets')],
        loader: 'file-loader',
        options: {
          context: 'src',
          name: '[name].[ext]',
          outputPath: (url, resourcePath, context) =>
            path.relative(context, resourcePath),
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new IgnoreEmitPlugin(/\.([jt]s(\.map)?|woff)$/),
  ],
  devtool: 'source-map',
  optimization: {
    sideEffects: false,
  },
};
