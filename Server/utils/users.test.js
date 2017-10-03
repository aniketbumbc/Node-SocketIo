const expect=require('expect');
const{Users}=require('./users');


describe('Users',()=>{


beforeEach(()=>{
users=new Users();
users.users=[{

    id:'1',
    name:'Bunny',
    room:'Game Chat'
},
    {
    
        id:'2',
        name:'Bunnys',
        room:'Gamers Chat'
    },
    {
        
            id:'3',
            name:'Yahooo',
            room:'Game Chat'
        }]
    });



it('should add new users',()=>{

var users=new Users();

var user={
    id:123,
    name:'aniket',
    room:'game chat'
};
var resUser= users.addUser(user.id,user.name,user.room);

expect(users.users).toEqual([user]);
});

it('Should Remove Users',()=>{

var userId='1';
var user=users.removeUser(userId);
expect(user.id).toBe(userId);
expect(users.users.length).toBe(2);
});


it('should not remove user',()=>{

    var userId='100';
    var user=users.removeUser(userId);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);

});

it('should find user',()=>{

var userId='2';
var user=users.getUser(userId);

expect(user.id).toBe(userId);    
});

it('should not find user',()=>{
    var userId='50';
    var user=users.getUser(userId);
    
    expect(user).toNotExist();    
   
        
});


it('should return name game chat',()=>{

var userList=users.getUserList('Game Chat');

expect(userList).toEqual(['Bunny','Yahooo']);
});


it('should return name Gamers Chat',()=>{
    
    var userList=users.getUserList('Gamers Chat');
    
    expect(userList).toEqual(['Bunnys']);
    });
});