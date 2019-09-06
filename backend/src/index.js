const socketIo = require('socket.io');

const port = +process.env.PORT || 8081;
const io = socketIo(port);

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

console.log('Server is up and running on port', port);
