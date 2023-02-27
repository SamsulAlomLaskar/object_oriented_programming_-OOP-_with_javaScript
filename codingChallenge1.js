const Car = function (make, speed) {
  this.speed = speed;
  this.make = make;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`'${this.make}' going at ${this.speed}km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`'${this.make}' going at ${this.speed}km/h`);
};

const bmw = new Car("BMW", 110);
const mercedes = new Car("Mercedes", 100);

bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.accelerate();
mercedes.brake();
