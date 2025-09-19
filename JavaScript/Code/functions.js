// Function Declaration
function greet() {
    console.log("HEllo");
}

// greet();
// Function Expression
const greet = function() {
    console.log("Hello");
}
// // greet();
// console.log(greet);

// Arrow function
const greet = () => {
    console.log('Hello');
}

// Named Function expression
const greet = function greetFun() {
    console.log('Hello');
}

greet();

(function() {
    console.log("Hello");
})();

function add(a, b){
    console.log(a, b);
    console.log(arguments);
    console.log(arguments[2]);
    console.log(arguments[3]);
}

add(5, 3, 6, 9);


// Scope of Function



let x1 = 50;
{
    var a = 6;
    let b  = 10;
    const c = 35;
    var a = 7;
    b = 15;
    c = 39;
    console.log(c);
}


function print(){
    var b = 10;
}

console.log(b);

console.log(a, b, c);
console.log(x);



console.log(a);
console.log(b);
console.log(c);


var a;
let b;
// const c;


console.log(a);
var a = 5;
console.log(a);

var a;
console.log(a);
a = 5;
console.log(a);


print();
function print(){
    console.log('Hello');
}
print();


printf();
console.log(printf);
var printf = function(){
    console.log("Hello");
}
printf();


var x = 10;

function f() {
    var y = 20;

    function g() {
        var z = 30;
        console.log(x + y + z);
    }
    g();
}
f();