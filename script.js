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
! 3. the newly created object {} is linked to a Prototype (__proto__) is created
* 4. the object that is created at the beginning is than automatically returned from the constructor function
}
*/

const arifa = new Person("Arifa", 1999);
console.log(arifa);

console.log(samsul instanceof Person);

//! Prototypes -- Each & every function in JS automatically has a property called prototype & that includes constructor functions, every object created by a certain constructor function will get access to all the method & properties that we define on the constructor protoype property

console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2030 - this.birthYear);
};

samsul.calcAge();
arifa.calcAge();

//* Note that,- the prototype property is not the property of the constructor instead it is the property of the linked objects, i.e, the objects created from the constructor function

console.log(samsul.__proto__, "PROTO");
console.log("PROTO", samsul.__proto__ === Person.prototype);
console.log("IS PROTO", Person.prototype.isPrototypeOf(samsul));
console.log("IS PROTO", Person.prototype.isPrototypeOf(Person));

//* We can set properties on the prototype also

Person.prototype.species = "Homo Sapiens";
console.log(samsul.species, arifa.species, "Obj");

console.log(samsul.hasOwnProperty("calcAge"));
console.log(samsul.hasOwnProperty("firstName"));

console.log(Object.prototype);

// Built in prototype
console.log(samsul.__proto__.__proto__); // it will return the prototype of Object Constructor
console.log(samsul.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3, 4, 56, 7, 9, 7, 9, 3]; // new Array
console.log("ARPR", arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
console.log("OBJPR", arr.__proto__.__proto__);

//? Custom array methods
// Not recomended

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

// const h1 = document.querySelector("h1");
// console.dir(
//   h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__
// );
// console.log(h1.__proto__.__proto__);

//? ES6 classes to create prototypal inheritance
//Classes in JS do not work like classes in other languages like Java, C++, etc, instead classes in JS are just synthethic sugar

//* class Expression
// const PersonCl = class {};

//* class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // Methods will be added to .prototype property
  calcAge() {
    console.log(2030 - this.birthYear);
  }
}

const jessica = new PersonCl("Jessica", 1996);

console.log(jessica);
jessica.calcAge();

console.log(jessica.__proto__ === PersonCl.prototype);
PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.firstName}`);
};
jessica.greet();

//! Points to remember
/* 
* 1. Classes are not hoisted, even if they are class declarations
? 2. Just like functions Classes are also first class citizens(we can pass them into a function & return them from a function {becasuse classes are a special kind of functions BTS})
! 3. The body of a class always executed in strict mode

*/
