class Car {
  constructor(make, speed) {
    this.speed = speed;
    this.make = make;
  }

  accelerate() {
    this.speed += 10;
    console.log(`'${this.make}' going at ${this.speed}km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`'${this.make}' going at ${this.speed}km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new Car("Ford", 120);
const bmw = new Car("BMW", 110);
const mercedes = new Car("Mercedes", 100);

ford.speedUS = 50;
console.log(ford);

console.log(ford.speedUS);
ford.accelerate();
bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.accelerate();
mercedes.brake();
