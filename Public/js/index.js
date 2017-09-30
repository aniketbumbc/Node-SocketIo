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
    console.log('newMessage', message);
    var li = jQuery('<li></li>')
    li.text(`${message.from}:${message.text}`)
    jQuery('#message').append(li);
})
socket.on('newLocationMessage', function (message) {

    var li = jQuery('<li></li>')
    var a = jQuery('<a target="_blank">My Current Location</a>')
    li.text(`${message.from}:  `);
    a.attr('href', message.url)
    li.append(a);
    jQuery('#message').append(li);
})

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