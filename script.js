"use strict";

//! OOP

//? Constructor Function

// constructor function start with upper case , an arrow function will not work as a constructor because it doesn't have it's own THIS keyword
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never create a function inside constructor function
  //   this.calcAge = function () {
  //     console.log(2030 - this.birthYear);
  //   };
};

const samsul = new Person("Samsul", 1996);
console.log(samsul);

//The only difference between a normal function & constructor function is that the constructor function is called with NEW keyword

// BTS when we call a function with new operator
/* 
* 1. a new (NEW {}) empty object is created 
? 2. the function is called & this keyword will be set to the newly created object, this = {
! 3. the newly created object is linked to a Prototype
* 4. the object that is created at the beginning is than automatically returned from the constructor function
}
*/

const arifa = new Person("Arifa", 1999);
console.log(arifa);

console.log(samsul instanceof Person);
