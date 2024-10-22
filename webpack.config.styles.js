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
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              esModule: true,
              modules: {
                namedExport: true,
                localIdentName: 'foo__[name]__[local]',
              },
            },
          },
        ],
      },
      {
        test: /\.(t|j)sx?$/,
        loader: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
        options: {
          configFile: path.resolve(__dirname, 'jsconfig.styles.json'),
        },
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
  devtool: 'source-map',
  optimization: {
    minimize: true,
    sideEffects: false,
  },
};
