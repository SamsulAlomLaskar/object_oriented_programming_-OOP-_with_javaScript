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
/* 

*
const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

//  Connecting the Student Constructor Prototype with Person Constructor Prototype
!
Student.prototype = Object.create(Person.prototype);
*
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};
?
const mike = new Student("Mike", 2020, "Computer Science");
mike.introduce();
mike.calcAge();

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);
*
Student.prototype.constructor = Student;

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);
console.dir(Student.prototype.constructor);
 */

//! Inheritance between Classes Constructor Functions Using the ES6 Feature

//Connecting the StudentCl Constructor Prototype with PersonCl Constructor Prototype by using the extend & super keyword

/* 
class StudentCl extends PersonCl {

  //! If we do not need any additional properties than we do not need the constructor & the super methods in the child/sub class
  //   constructor(fullName, birthYear, course) {
  // super(fullName, birthYear);
  // this.course = course;
  //   }
}
 */

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    //* Super is basically the constructor function of parent class. i.e, the PersonCl class
    //? here in the child constructor i.e the super always needs to be the first, because the super is responsible for creating the THIS keyword in this sub/child class
    super(fullName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }
  calcAge() {
    console.log(
      `I'm ${
        2030 - this.birthYear
      } years old, but as a student i feel more like ${
        2030 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl("Martha Jones", 2012, "Computer Science");
console.log(martha);
martha.introduce();
martha.calcAge();

//! Inheritance between Classes Constructor Functions Using the Object.create() in implementing the complex prototype chain

const ikbal = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);

StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.name} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init("Jay", 2010, "Computer Science");
jay.introduce();
jay.calcAge();

//! Encapsulation - to keep properties & the methods private inside the class so that they're not accessible from the outside of the class, (then the rest of the methods are exposed to the public interface which we also call API) --- Why encapsulation & data privacy?
//* 1. To prevent code from outside of the class to accidently manipulate data inside the class

//* 2. When we expose only a small interface so a small API consisting of only few public methods, then we can change only other internal methods with more confidence, because in this case we can be sure that the external code doesn't rely on these private methods, therefore our code will not break when we do our internal changes

//? However the JS classes actually do not yet support real data privacy & encapsulation

//! Encapsulation & Private class fields

//? 1. Public fields & 2. Private fields
//? 3. Public methods & 4. Private methods
//? 5. (there is also the static version)

class Account {
  //! 1. Public Field (instances)

  //* field is an property of all the instances, so we can call it public instance field

  //? We need to give a semi-colon (;) at the end of the field after declaring & we don't need to declare it with any let or const

  //* Note that the fields are not the part of the prototype,they are in the instances but the methods are part of the prototype
  locale = navigator.language;
  //   _movements = [];

  //! Private fields (instances) - this will be accessible in the instances but not in the prototype

  //* properties are not truly not accessible from outside
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;

    // since it is not truly private we call it as Protected property (we are not allowed to touch this outside the class, if reqd we can create a method with name starting with get)

    //? Protected property

    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  //! 3. Public methods
  // Public interface
  getMovements() {
    return this.#movements;
  }

  //* This methods are called the (public interface) interface to our objects/API

  deposit(val) {
    return this.#movements.push(val);
  }
  withdraw(val) {
    this.deposit(-val);
  }

  requestLoan(val) {
    // if (this.#approveLoan(val)) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan Approved`);
    }
  }

  //! 4. Private methods -
  //* To hide the implementation details from the outside
  _approveLoan(val) {
    return true;
  }
  //   #approveLoan(val) {
  //     return true;
  //   }

  //! 5. Static methods - it will not available on all the instances but only on the class itself
  static helper() {
    console.log("Helper");
  }
}
/* 
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;

    // since it is not truly private we call it as Protected property (we are not allowed to touch this outside the class, if reqd we can create a method with name starting with get)

    //? Protected property

    this._pin = pin;
    this._movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // Public interface
  getMovements() {
    return this._movements;
  }

  //* This methods are called the (public interface) interface to our objects/API

  deposit(val) {
    return this._movements.push(val);
  }
  withdraw(val) {
    this.deposit(-val);
  }

  _approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan Approved`);
    }
  }
}
 */

const acc1 = new Account("Samsul", "INR", 1111);
acc1.deposit(459);
acc1.withdraw(259);
// acc1._movements.push(330);
console.log("HHH", acc1.getMovements());

// in practical this methods shouldn't be accessed by the outsiders
acc1.requestLoan(1000);
// console.log("Approve Loan", acc1.#approveLoan(100));

console.log(acc1);

//? Truly private class fields & methods
//! Why it is called fields? - in traditional languages like java, c++ properties are usually called fields

// console.log(acc1.#movements); //? Uncaught SyntaxError: Private field '#movements' must be declared in an enclosing class
// console.log(acc1.#pin);
Account.helper();
