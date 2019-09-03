const socketIo = require('socket.io');

const port = +process.env.PORT || 8081;
const io = socketIo(port);

io.on('connection', socket => {
    console.log('socket connected', socket.id);

    socket.userData = socket.userData || {};

    socket.on('online', username => {
        console.log('socket sent online event with username', username);

        socket.userData.username = username;
        io.emit('user-join', {username});
    });

    socket.on('disconnect', () => {
        console.log('socket', socket.userData.username, 'disconnected');
        io.emit('user-leave', {username: socket.userData.username});
    });
});

console.log('Server is up and running on port', port);
