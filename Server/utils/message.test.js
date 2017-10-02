var expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {

    it('should generate correct Object', () => {
        var from = "aniket";
        var text = "how are you";
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, text });

    }); 
});


describe('generateLocationMessage', () => {
    it('Shoud generate correct location object ', () => {

        var from = "aniket";
        var latitude = 19;
        var longitude = 73;
        var url = 'https://www.google.co.in/maps?q=19,73';

        var message = generateLocationMessage(from, latitude, longitude);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, url });
    });
});