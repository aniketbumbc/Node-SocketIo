const path=require('path');
const http=require('http');
const publicPath= path.join(__dirname,'../public');
const express=require('express'); //middleware express
const sokectIO=require('socket.io');
const port=process.env.PORT || 3000;
var app=express();//middleware
var server=http.createServer(app);
var io=sokectIO(server);


app.use(express.static(publicPath));

io.on('connection',(socket)=>{     //connection event to client 
console.log('New User Connected');

 socket.emit('newMessage',{
    from:'Admin',
    text:'Welcome to Chat Application',
    createAt:new Date().getTime()
 });

 socket.broadcast.emit('newMessage',{     //broadcast to other user not selfone 
       from:'admin',
        text:'new user join',
      createAt:new Date().getTime()

 });



socket.on('createMessage', (message) =>{
    console.log('Create Message',message);
    io.emit('newMessage',{
        from:message.from,
        text:message.text,
        createAt:new Date().getTime()

// socket.broadcast.emit('newMessage',{     //broadcast to other user not selfone 
//     from:message.from,
//    text:message.text,
//    createAt:new Date().getTime()


    });
});






socket.on('disconnect',(socket)=>{
    console.log('User disconnected');    
});
});
server.listen(port,()=>{
    
        console.log(`Hello console Serverup ${port}` );
    });
