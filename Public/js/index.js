var socket = io();
socket.on('connect', function () {
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
socket.on('disconnect', function () {
    console.log('Disconnected to Server');

});
socket.on('newMessage', function (message) {
    var formatedTime=moment(message.createdAt).format('MMM Do, YYYY,h:mm a');
    var template=jQuery('#message-template').html();
    var html=Mustache.render(template,{
        text:message.text,
        from:message.from,
        createdAt:formatedTime

    });
    jQuery('#message').append(html);
})
socket.on('newLocationMessage', function (message) {
var formatedTimeLocation=moment(message.createdAt).format('MMM Do, YYYY,h:mm a');
var template=jQuery('#location-message-template').html();
var html=Mustache.render(template,{
from:message.from,
url:message.url,
createdAt:formatedTimeLocation
});
jQuery('#message').append(html);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    var messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()

    }, function () {
        messageTextbox.val('')
    })
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {

        return alert("Gelocation Not Support by browser");
    }

    locationButton.attr('disabled','disabled').text('sending Location....');
    navigator.geolocation.getCurrentPosition(function (position) {
locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert('not found location');
        locationButton.removeAttr('disabled');
    });
});