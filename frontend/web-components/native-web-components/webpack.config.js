module.exports = {
  mode: 'production',
  entry: {
    button: './src/button.js',
    'number-field': './src/number-field.js',
    'text-field': './src/text-field.js',
  },
  output: {
    filename: 'native-web-components-[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
        },
      }
    ],
  },
};
