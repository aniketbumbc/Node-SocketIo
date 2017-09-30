const path=require('path');
const http=require('http');
const publicPath= path.join(__dirname,'../Public');
const express=require('express'); //middleware express
const sokectIO=require('socket.io');
const port=process.env.PORT || 3000;
const {generateMessage,generateLocationMessage}=require('./utils/message')

var app=express();//middleware
var server=http.createServer(app);
var io=sokectIO(server);


app.use(express.static(publicPath));

io.on('connection',(socket)=>{     //connection event to client 
console.log('New User Connected');

 socket.emit('newMessage',generateMessage('Admin','Welcome to Chat App'));
 socket.broadcast.emit('newMessage',generateMessage('Admin','New User Join to Group')); //broadcast to other user not selfone 
socket.on('createMessage', (message,callback) =>{
    console.log('Create Message',message);
    io.emit('newMessage',generateMessage(message.from,message.text));
callback({
    text:"This Hello From Server"
})
// socket.broadcast.emit('newMessage',{     //broadcast to other user not selfone 
//     from:message.from,
//    text:message.text,
//    createAt:new Date().getTime()
});

socket.on('createLocationMessage',(coords)=>{

io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude))
});




socket.on('disconnect',(socket)=>{
    console.log('User disconnected');    
});
});
server.listen(port,()=>{
    
        console.log(`Hello console Serverup ${port}` );
    });
