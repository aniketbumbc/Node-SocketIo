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

io.on('connection',(socket)=>{
console.log('New User Connected');

socket.on('disconnect',(socket)=>{
    console.log('User disconnected');
    
});
});






server.listen(port,()=>{
    
        console.log(`Hello console Serverup ${port}` );
    });
