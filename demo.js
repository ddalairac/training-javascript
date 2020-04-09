'use strict';
// funcion auto ejecutable
console.warn("funcion auto ejecutable");
(function () {
    console.log('Hello World');
})();

// Objeto litaral --------------------------------
console.warn("Objeto litaral");
let person = {
    name: 'diego',
    last: 'dalairac',
    age: 37,
    isOld: function () {
        return this.age >= 35;
    },
    isOld2() { // se puede usar sintaxis de class si es objeto literal
        return this.age >= 35;
    }
}
console.log(person.isOld2())

// iterar claves
console.log(Object.keys(person))

for (let propertyName in person) {
    console.log(propertyName)
}


// Mutar objeto --------------------------------
let apariencia = {
    height: 183,
    weigth: 84
}
console.warn("Mutar objeto");
// Object.assign(person,apariencia)
person = { ...person, ...apariencia }
console.log(person)

// Constructor function --------------------------------
console.warn("Constructor function");
function Persona(n, l, a) {
    this.name = n;
    this.lastName = l;
    this.age = a;
    this.isOld = function () {
        return this.age >= 35;
    }
}
let persObj = new Persona('diego', 'dalairac', 37)
console.log("persObj: ", persObj)

// acceder atributo
console.warn("Atributos");
console.log("att:", persObj.name)
let att = "name";
console.log("bracket notation:", persObj[att])



// Property
console.warn("Property");
console.log(Object.getOwnPropertyDescriptor(persObj, "name"));
/*  propiedades de un atributo
value: "diego"
writable: true ()
enumerable: true ()
configurable: true ()
*/
Object.defineProperty(persObj, "name", { writable: false }) // permitir cambiar el valor
// persObj.name = "juan"; // da error

Object.defineProperty(persObj, "name", { enumerable: false }) // permitir ser iterable
// console.log(Object.keys(persObj)); // no va a tener nombre

Object.defineProperty(persObj, "name", { configurable: false }) // bloquea modificar enumerable y a si mismo. Tampoco permite borrar el att
// Object.defineProperty(persObj,"name",{enumerable:true}) // da error
// Object.defineProperty(persObj,"name",{configurable:true}) //  da error
// delete persObj.name // da error
// no tiene efecto en 'writable'

Object.freeze(persObj) // inmutable (no se pueden alterar o agregar atributos)
/* writable: false 
configurable: false */
// console.log(Object.getOwnPropertyDescriptor(persObj,"name"));


// Getter & Setters
console.warn("Getter & Setters");
function PersonaGetSet(n, l, a) {
    this.name = n;
    this.lastName = l;
    this.age = a;
    this.isOld = function () {
        return this.age >= 35;
    }
}
// no se pueden definir en la funcion constructora, se hacen en el prototipo
PersonaGetSet.prototype = {
    get fullname() {
        return this.name + " " + this.lastName; ``
    },
    set fullname(value) {
        let parts = value.split(' ');
        this.name = parts[0];
        this.lastName = parts[1];
    }
};
let persGetSetObj = new PersonaGetSet('diego', 'dalairac', 37)
persGetSetObj.fullname = "juan carlos"
console.log("getter: ", persGetSetObj.fullname)
console.log("name: ", persGetSetObj.name)


// Prototipe
console.warn("Prototipe");
/* Cuando hacemos una función constructor, se crea en memoria el espacio con el prototipo. 
Cada nueva instancia tiene un atributo '__proto__' que es una referencia al 'prototipe' de la función.
Modificar el prototipo o __proto__ es lo mismo. Son referencias al mismo objeto.
Si el objeto tiene un atributo con el mismo nombre, cuando se lo invoca no usa el del prototipo, en caso de no existir, va a buscarlo al prototipo.
Un atributo en el prototipo, es como un atributo estatico.
 */
// console.log("prototipe: ",Persona.prototype)
// console.log("__proto__: ",persObj.__proto__) // Persona.prototipe
// console.log("__proto__.__proto__: ",persObj.__proto__.__proto__) // Object.prototipe
// console.log("__proto__.__proto__.__proto__: ",persObj.__proto__.__proto__.__proto__) // null

function Student(n, l, a) {
    PersonaGetSet.call(this, n, l, a);
    this.id = 1;
    this._materias = []
    this.addMaterias = function (mat) {
        this._materias.push(mat)
    }
    this.getMaterias = function () {
        return this.fullname + ": " + this._materias.join(', ');
    }
}
Student.prototype = Object.create(PersonaGetSet.prototype);
Student.prototype.constructor = Student;
/*Object.create:
Se usa en vez de 'new' porque no queremos ejecutar una nueva instancia en este momento. 
Eso va a pasar en el cuando se cree la nueva instancia de Student 

Student.prototype.constructor = Student
prototipe.constructor: guarda la funcion (function Student(x,x,x){...});
el prototipo de Student va a ser el de persona, pero el constructor del mismo, queremos que siga siendo el de student
*/

let st = new Student("Emet", "Brown", 65);
st.addMaterias("MA101");
st.addMaterias("LAB3");
console.log("getMaterias(): ", st.getMaterias())

console.log("st", st);
console.log("st.__proto__", st.__proto__);
console.log("st.__proto__.__proto__", st.__proto__.__proto__);



// Clases
console.warn("Clases");
// ? desde ES6 (no ie)
/* El resultado es el mismo que las funciones constructoras, pero con sintaxis mas clara */

class Veicle{
    weels = 4;
}
class Car extends Veicle{
    constructor(c, m, y) {
        super();
        this.color = c;
        this.model = m;
        this.year = y;
    }
    static lights = false;
    engine = false;
    get carData(){
        return  this.color + " - " + this.model + " - " + this.year;
    }
    set carData(value){
        let data = value.split(' - ');
        this.color = data[0];
        this.model = data[1];
        this.year = data[2];
    }
    static toogleLights(){
        Car.lights = !Car.lights; 
    }
    toogleCar(){
        this.engine = !this.engine; 
    }
}
let auto = new Car("red","ferrary",2020);
console.log("instance",auto)
console.log("instance keys",Object.keys(auto))
console.log("class keys",Object.keys(Car))



// Comparar
console.warn("Comparar");
console.log("== (NO type safe)")
console.log("'42'== 42", '42' == 42)
console.log("0 == false", 0 == false)
console.log("null == undefined", null == undefined)
console.log("''== 0", '' == 0)
console.log("arr[1,2] == str'1,2'", [1, 2] == '1,2')
console.log("")

console.log("=== (type safe)")
console.log("'42'=== 42", '42' === 42)
console.log("0 === false", 0 === false)
console.log("null === undefined", null === undefined)
console.log("''=== 0", '' === 0)
console.log("arr[1,2] === str'1,2'", [1, 2] === '1,2') 
console.log("")

console.log("Object.is() (type safe)")
console.log("Object.is('42',42", Object.is('42',42))
console.log("Object.is(0,false", Object.is(0,false))
console.log("Object.is(null,undefined", Object.is(null,undefined))
console.log("Object.is('',0", Object.is('',0))
console.log("Object.is([1, 2],'1,2')", Object.is([1, 2],'1,2')) 

// credito a https://github.com/jmcooper/javascript-opc