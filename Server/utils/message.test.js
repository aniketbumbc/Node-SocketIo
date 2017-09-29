var expect=require('expect');
var{generateMessage}=require('./message');

describe('generateMessage', ()=>{

it ('should generate correct Object',()=>{
var from="aniket";
var text="how are you";
var message=generateMessage(from,text);

expect(message.createdAt).toBeA('number');
expect(message).toInclude({from,text});

});
});