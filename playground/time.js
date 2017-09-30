var moment=require('moment');



// var date =new Date ();
// var months=['jan', 'Feb'];
// console.log(date.getMonth());

var date=moment();
date.add(10,'year').subtract(9,'months');
console.log(date.format('MMM Do, YYYY,h:mm a'));


var createdAt=124