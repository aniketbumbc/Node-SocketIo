const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../Public');
const express = require('express'); //middleware express
const sokectIO = require('socket.io');
const port = process.env.PORT || 3000;
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

var app = express();//middleware
var server = http.createServer(app);
var io = sokectIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {     //connection event to client 
    console.log('New User Connected');
        //broadcast to other user not selfone 


    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name require and Room name need');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has Joined`));
        callback();
    });
    socket.on('createMessage', (message, callback) => {
        //console.log('Create Message', message);
        var user = users.getUser(socket.id);
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback();
    });
    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
        }
    });
    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left form room`));
        }
    });
});
server.listen(port, () => {

    console.log(`Hello console Serverup ${port}`);
});
