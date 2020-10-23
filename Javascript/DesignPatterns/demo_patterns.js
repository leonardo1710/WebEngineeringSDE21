/** Creational Pattern */

// Idea of "creating new things", eg. new objects.

var newObject = {}; // or
var newObject = Object.create(null); // or
var newObject = new Object();

//adding properties
newObject.prop = true;
newObject["prop2"] = 1;
Object.defineProperties(newObject, {
    "someKey": {
        value: "test",
        writable: true
    },
    "anotherKey": {
        value: "cannot be changed",
        writable: false    //value cant be changed
    }
})

//console.log('newObject :>> ', newObject);

newObject.someKey = "test2";
newObject.anotherKey = "change value";

//console.log('newObject :>> ', newObject);



/** Singleton Pattern */







/** Module pattern in JS **/

//  The module pattern encapsulates 'privacy', state and organization using closures
//  Protects pieces from leaking to global scope
var app = (function(){
    'use strict'; // execute javascript in strict mode. Eg: usage of undeclared variables is not allowed.

    let myPrivateVariable = 0;
    
    let myPrivateMethod = function(textToLog){
        console.log(textToLog);
    }

    let myPublicFunction = function(){
        console.log("I am public");
        myPrivateVariable++;
    }

    let getVar = function(){
        return myPrivateVariable;
    }

    //public
    return {
        publicVariable: "I am a public variable",
        myPublicFunction: myPublicFunction,
        getVar: getVar
    }
}());


app.myPublicFunction();
console.log(app.publicVariable);
console.log(app.getVar());