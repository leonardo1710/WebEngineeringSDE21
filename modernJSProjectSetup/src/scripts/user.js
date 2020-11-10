export default class User { 
  constructor(name) {
    this.name = name;
  }

  sayHi(){
    console.log("Hello " + this.name + "!");
  }
}