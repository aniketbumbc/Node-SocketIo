[{
    id: '/#hello',
    name: 'Bunny',
    room: 'Game Chat'
}]
class Users {

    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        var user = { id, name, room };
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;

    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0]
    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
}
module.exports = { Users };















// class Person {

//     constructor(name,age){

//         this.name=name;
//         this.age=age;
//     }

//     getUser(){

//         return `${this.name} is best and age is ${this.age} old`;
//     }

// }

// var me =new Person("aniket", 343);
// var getUsers=me.getUser();
// console.log(getUsers);