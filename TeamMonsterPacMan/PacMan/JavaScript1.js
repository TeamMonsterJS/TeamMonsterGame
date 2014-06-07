function Person(first_name, last_name) {
    this.first_name = first_name
    this.last_name = last_name
}


// (person:String) → String
// Greets the given person
Person.prototype.greet = function (person) {
    return this.name + ': Hello, ' + (person || 'you')
}


var proto = Object.getPrototypeOf;

// new Mikhail (age:Number, gender:String)
function Mikhail(age, gender) {
    // Find the parent of this object and invoke its constructor
    // with the current this. We could have used:
    //   Person.call(this, 'Mikhail', 'Weiß')
    // But we'd lose some flexibility with that.
    proto(Mikhail.prototype).constructor.call(this, 'Mikhail', 'Weiß')
}

// Inherits the properties from Person.prototype
Mikhail.prototype = Object.create(Person.prototype);

// Resets the `constructor' property of the prototype object
Mikhail.prototype.constructor = Mikhail;

// (person:String) → String
//Mikhail.prototype.greet = function (person) {
//    return this.name + ': \'sup, ' + (person || 'dude')
//}


// Instances are created with the `new' operator, as previously
// discussed:
var mikhail = new Mikhail(19, 'Male');
//console.log(mikhail.greet('Kristin'));
// => 'Mikhail Weiß: \'sup, Kristin'

function Animal(name, age) {
    this.name = name;
    this.age = age;
}

var proto1 = Object.getPrototypeOf;

function Dog(name, age, breed) {
    proto1(Dog.prototype).constructor.call(this, name, age, breed);
    this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);

Dog.prototype.constructor = Dog;

var buldog = new Dog('johny', 5, 'buldog');

for (var prop in buldog) {
    console.log(prop + '  --->   ' + buldog[prop]);
}