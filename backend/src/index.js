const socketIo = require('socket.io');

const port = +process.env.PORT || 8081;
const io = socketIo(port);

const usernames = new Map();

io.on('connection', socket => {
  console.log('socket connected', socket.id);

  socket.userData = socket.userData || {};

  socket.on('online', username => {
    console.log('socket sent online event with username', username);

    if (usernames.has(username)) {
      console.log('user', username, 'already exists, disconnecting...');
      socket.emit('user-name-exists');
      socket.disconnect(0);
      return;
    }

    usernames.set(username, socket.id);
    socket.userData.username = username;
    socket.join('online');
    socket.to('online').emit('user-join', { username });
    socket.emit('all-users', { usernames: Array.from(usernames.keys()) });
  });

  socket.on('disconnect', () => {
    console.log('socket', socket.userData.username, 'disconnected');
    usernames.delete(socket.userData.username);
    io.emit('user-leave', { username: socket.userData.username });
  });
});

console.log('Server is up and running on port', port);
