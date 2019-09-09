const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/chat-link.js'),
  output: {
    library: 'LitElementChatLink',
    path: path.resolve(__dirname, 'dist'),
    filename: 'lit-element-chat-link.js',
  },
};
