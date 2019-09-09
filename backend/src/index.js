const http = require('http');
const socketIo = require('socket.io');
const generateLinkPreview = require('./link-preview');

function simpleApiBackend(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if ( req.method === 'OPTIONS' ) {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method.toLowerCase() === 'post' && req.url === '/api/link-preview') {
    console.log('link preview requested');
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      if (!body) {
        res.writeHead(204);
        res.end();
        return;
      }

      let link = '';

      try {
        link = JSON.parse(body).link;
      }
      catch {
        res.writeHead(204);
        res.end();
        return;
      }

      generateLinkPreview(link).then(
        result => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(result));
          res.end();
        },
        () => {
          res.writeHead(500);
          res.end();
        },
      );
    });

    req.on('error', () => req.end());

    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({ nix: 'gut' }));
  res.end();
}

const server = http.createServer(simpleApiBackend);

const port = +process.env.PORT || 8081;
const io = socketIo(server);

const usernames = new Map();

io.on('connection', socket => {
  console.log('socket connected', socket.id);

  socket.userData = socket.userData || {};

  socket.on('register', (username, fn) => {
    console.log('socket sent online event with username', username);

    if (usernames.has(username)) {
      console.log('user', username, 'already exists, disconnecting...');
      fn(true);
      socket.disconnect(0);
      return;
    }

    usernames.set(username, socket.id);
    socket.userData.username = username;
    socket.join('online');
    socket.to('online').emit('user-join', { username });
    socket.emit('all-users', { usernames: Array.from(usernames.keys()) });
    fn(false);
  });

  socket.on('private-message', (messageObj, fn) => {
    console.log('received private message', JSON.stringify(messageObj));

    const { to, message } = messageObj;

    if (!usernames.has(to)) {
      fn('user not found');
      return;
    }

    const socketIdToSendTo = usernames.get(to);

    const timestamp = Date.now();
    io.to(socketIdToSendTo).emit('private-message', {
      message,
      from: socket.userData.username,
      timestamp,
    });

    fn(timestamp);
  });

  socket.on('disconnect', () => {
    console.log('socket', socket.userData.username, 'disconnected');
    usernames.delete(socket.userData.username);
    io.emit('user-leave', { username: socket.userData.username });
  });
});

server.listen(port, () => console.log('Server is up and running on port', port));
