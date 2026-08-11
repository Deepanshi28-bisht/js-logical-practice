// Sum of Two Numbers
function addNumbers(a, b) {
    return a + b;
}

console.log(addNumbers(2, 5));

// Even or Odd
function isEven(num) {
    if (num % 2 !== 0) {
        return false
    }
    return true
}

console.log("kkkk", isEven(12));

//Multiplication Table
function printTable(n) {
    for (let i = 1; i <= 10; i++) {
        console.log(`${n} * ${i} = ${n * i}`);
    }
}

printTable(15);

// Find String Length Without .length
function getLength(str) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        count++;
    }
    console.log(count);
}
getLength("Deepanshi")

//Celsius to Fahrenheit


// const usernumber = prompt("Please enter celsius which you want to convert in fahrenheit")
// console.log("usernumber", Number(usernumber));
// const res = celsiusToFahrenheit(Number(usernumber))

function celsiusToFahrenheit(celsius) {
    return (celsius * 1.8) + 32
}
const res = celsiusToFahrenheit(12);

console.log("🚀 ~ res:", res);
