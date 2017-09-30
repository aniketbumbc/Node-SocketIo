var socket=io();
socket.on('connect',function(){
    console.log('Connected to Server');

    // socket.emit('createEmail',{
    //     to:'aniket@umbc.edu',
    //     text:'how are you today'
    // });


    // socket.emit('createMessage',{
    //     from:'Bunny',
    //     text:'Hello How are you',
    //     });
});





socket.on('disconnect', function(){
    console.log('Disconnected to Server');

});

socket.on('newMessage',function (message){
console.log('newMessage',message);
var li=jQuery('<li></li>')
li.text(`${message.from}:${message.text}`)
jQuery('#message').append(li);
})

jQuery('#message-form').on('submit',function(e){
e.preventDefault();


socket.emit('createMessage',{

    from:'User',
    text:jQuery('[name=message]').val()

},function(){


})
});