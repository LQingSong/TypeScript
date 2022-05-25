// let anythings: any = "tom";
// anythings.myName.setFistName("a");

// console.log(anythings);

interface person {
  name: string;
  age?: number;
  s?: symbol;
  [propName: string]: string | number | symbol | undefined;
}

let tom: person = {
  name: "Tom",
  age: 12,
};

console.log(tom);

interface searchFun {
  (arg1: number, arg2: string): boolean;
}

let mySearchFun: searchFun;
mySearchFun = function (a: number) {
  return false;
};

function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
}

function f(params: number): number;
function f(params: boolean): boolean;
function f(params: number | string | boolean): number | string | boolean {
  return params;
}

interface Animal {
  name: string;
}

interface Cat {
  name: string;
  run(): void;
}

const animal: Animal = {
  name: "tom",
};

let c: Cat = animal as Cat;

type StrOrNum = string | number;
function print(params: StrOrNum) {
  if (typeof params === "string") {
    console.log("str:" + params);
  } else if (typeof params === "number") {
    console.log("num:" + params);
  }
}
print("12");

let Tom: [string, number] = ["foo", 24];
Tom[0].slice(1);
Tom[1] = 25;
console.log(Tom[1].toFixed(2));

console.log(Tom);

enum Days {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

abstract class Person {
  // public name;
  constructor(public name: string) {
    this.name = name;
  }

  public get getName(): string {
    return this.name;
  }

  public set setName(value: string) {
    this.name = value;
  }

  sayHi(): string {
    return `My name is ${this.name}`;
  }

  abstract absFun(): void;

  static isPerson(a: any): boolean {
    return a instanceof Person;
  }
}

interface IStudentWriteWork {
  write(): void;
}

class Student extends Person implements IStudentWriteWork {
  absFun(): void {
    console.log("abs");
  }
  constructor(name: string) {
    super(name);
  }
  write(): void {
    console.log("write homework");
  }
  sayHi(): string {
    return super.sayHi() + ` I'm a student.`;
  }
}

let Jack = new Student("Jack");
console.log(Jack.sayHi());
Jack.write();

class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

interface PointInstanceType {
  x: number;
  y: number;
}

interface Point3D extends Point {
  z: number;
}

let p3: Point3D = { x: 1, y: 2, z: 3 };
