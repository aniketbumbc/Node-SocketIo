const path=require('path');
const publicPath= path.join(__dirname,'../public');
const express=require('express'); //middleware express
var app=express();//middleware
app.use(express.static(publicPath));
const port=process.env.PORT || 3000;













app.listen(port,()=>{
    
        console.log(`Hello console Serverup ${port}` );
    });
