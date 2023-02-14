"use strict";

// CONSTRUCTION FUNCTION
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2023 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

Student.prototype = Object.create(Person.prototype);

// Coding Challange #1

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(this.speed);
// };

// Car.prototype.brake = function () {
//   this.speed += -5;
//   console.log(this.speed);
// };

// const bmw = new Car("BMW", 120);
// const audi = new Car("Audi", 85);

// classes

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Methods will be added to .prototype property
  calcAge = function () {
    console.log(2022 - this.birthYear);
  };

  set fullName(name) {
    console.log(name);
    if (name.includes(" ")) this._fullName = name;
    else alert("incorrect");
  }

  get fullName() {
    return this._fullName;
  }
}

const jessica = new PersonCl("Jessica", 1999);
// console.log(jessica);
// jessica.calcBirth();

console.log(jessica.__proto__ === PersonCl.prototype); //true

// Getters and Setters

const account = {
  owner: "Patryk",
  movements: [200, 40, 2400, 500],

  // get latest() {
  //   return this.movements.slice(-1).pop();
  // },

  // set latest(mov) {
  //   this.movements.push(mov);
  // },
};

const walter = new PersonCl("Walter White", 1965);

// console.log(walter);

// Coding Challange 2

// class CarCl {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log(this.speed);
//   }

//   brake() {
//     this.speed - +5;
//     console.log(this.speed);
//   }

//   get speedUS() {
//     return this.speed / 1.6;
//   }

//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// const ford = new CarCl("ford", 120);
// console.log(ford.speedUS);
// ford.speedUS = 50;
// console.log(ford);

//

Student.prototype.introduction = function () {
  console.log(
    `My name is ${this.firstName}, I was born in ${this.birthYear} I attend ${this.course}`
  );
};

const mikolaj = new Student("Mikolaj", 1999, "JS");
console.log(mikolaj);

mikolaj.introduction();
mikolaj.calcAge();

console.log(mikolaj instanceof Student);
console.log(mikolaj instanceof Person);

console.dir(Student.prototype.constructor);
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

// Challange #3

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going ${this.speed}`);
};

Car.prototype.brake = function () {
  this.speed += -5;
  console.log(
    `${this.make} is going ${this.speed} and has ${this.charge} % battery`
  );
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} is going ${this.speed} and has ${this.charge} % battery`
  );
};

const tesla = new EV("tesla", 100, 50);
const bmw = new Car("bmw", 60);
bmw.accelerate();
tesla.accelerate();

console.log(tesla);

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(
      `My name is ${this.fullName}, I was born in ${this.birthYear} I attend ${this.course}`
    );
  }
}

const martha = new StudentCl("Martha Jones", 2012, "IT");
martha.introduce();
martha.calcAge();
console.log(martha);

// Challange 4

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  brake() {
    this.speed - +5;
    console.log(this.speed);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCL extends CarCl {
  constructor(make, speed, charge) {
    super(make, speed);
    this._charge = charge;
  }

  accelerate() {
    this.speed += 10;
    this._charge -= 1;
    console.log(
      `${this.make} is going ${this.speed} and battery is ${this._charge}%`
    );
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(
      `${this.make} is going ${this.speed} and battery is ${this._charge}%`
    );
    return this;
  }
}

const ford = new CarCl("ford", 120);

const Tesla = new EVCL("Tesla", 90, 80);

Tesla.accelerate().accelerate().brake().accelerate();

// fibonaci

// 1,1,2,3,5,8,13,21

// last(1) + current(2) = new(3)
// last(2) + current(3) = new(5)
// last  = current
// current = new

// 1+1 = 2
// 1+2 = 3
// 2+3 = 5
// 3+5 = 8

const fib = function (n) {
  let current = 1;
  let last = 0;
  let newNum = 0;
  const fibArr = [];
  for (let i = 0; i < n; i++) {
    newNum = last + current;
    last = current;
    current = newNum;
    fibArr[i] = last;
  }
  console.log(last);
  return fibArr;
};

console.log(fib(10));

function fibonacci(n) {
  if (n === 1) {
    return [0, 1];
  } else {
    const arr = fibonacci(n - 1);
    arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
    return arr;
  }
}
console.log(fibonacci(5)); //[0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]

const b = 100;

const test = function (a) {
  if (a > b) {
    console.log("test");
  }
};

test(120);
