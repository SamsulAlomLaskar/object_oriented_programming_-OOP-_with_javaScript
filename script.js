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

//! Prototypes --
//? Each & every function in JS automatically has a property called prototype & that includes constructor functions, every object created by a certain constructor function will get access to all the method & properties that we define on the constructor protoype property

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

/* 
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2030 - this.birthYear);
  }

  get age() {
    return 2030 - this.birthYear;
  }
}
 */
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  //? Instance methods - these methods will be added to the prototype which will be accessible by all the objects created using this constructor

  // Methods will be added to .prototype property
  calcAge() {
    console.log(2030 - this.birthYear);
  }

  get age() {
    return 2030 - this.birthYear;
  }

  // Whenever we set a property that already exists
  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  //? Static method
  // Using static method with the help of static keyword

  static hey() {
    console.log("Hey there 👋");
    console.log("in class constructor ES6", this);
  }
}

const jessica = new PersonCl("Jessica Davis", 1996);

console.log(jessica);
jessica.calcAge();

console.log(jessica.__proto__ === PersonCl.prototype);
PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.fullName}`);
};
jessica.greet();

const walter = new PersonCl("Walter White", 1995);

//! Points to remember
/* 
* 1. Classes are not hoisted, even if they are class declarations
? 2. Just like functions Classes are also first class citizens(we can pass them into a function & return them from a function {becasuse classes are a special kind of functions BTS})
! 3. The body of a class always executed in strict mode

*/

//! Setter & Getter methods

const account = {
  owner: "Samsul",
  movements: [200, 235, 500, , 120, 563],

  // to make a method getter we use get keyword
  get latest() {
    return this.movements.slice(-1).pop();
  },

  // to make a method setter we use set keyword & it must have a parameter

  set latest(mov) {
    this.movements.push(mov);
  },
};

//* we can access the getter by just like any object key (we don't need to call that as a function/method) & the same is applicable for the setter as well

account.latest = 100;
console.log(account.latest);
console.log(account.movements);

//? Classes also do have getters & setters method & they do work in the same way

console.log(jessica.age);

// setter & getters can be very useful for data validations

//! Static Methods

// Array.from();

//* built in Array.from() method - from method is attached to the Array consturctor. So we could not use the from method on an array method [1,2,3].from() -> it will not work. Which means the from method is attached to the Array constructor not to the Array.prototype, therefore all the array do not inherit this method, from method is in Array name space (Number.parseFloat(32))

Person.hey = function () {
  console.log("Hey there 👋");
  console.log("in old constructor", this);
};
Person.hey();
// but samsul.hey() is not possible because the method is not attached to the prototype object of the Person constructor
PersonCl.hey();

//! 3rd way to implement prototypal inheritance or delegations using Object.create()

//* The main difference between the class constructor, Constructor Function & the the Object.create() is that in Object.create() there is no prototype or the constructor method required to set the prototype of the instance(the objected created from the Constructors)

const PersonProto = {
  calcAge() {
    console.log(2030 - this.birthYear);
  },

  init(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = "Steven";
steven.birthYear = 2000;
steven.calcAge();

console.log(steven.__proto__);

const sarah = Object.create(PersonProto);
sarah.init("Sarah", 1995);
sarah.calcAge();
console.log(sarah);

//! Inheritance between Classes Constructor Functions

/* 
?const Student = function (firstName, birthYear, course) {
  this.firstName = firstName;
  this.birthYear = birthYear;
  this.course = course;
};
 */

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

//  Connecting the Student Constructor Prototype with Person Constructor Prototype

Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student("Mike", 2020, "Computer Science");
mike.introduce();
mike.calcAge();

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);
console.dir(Student.prototype.constructor);
