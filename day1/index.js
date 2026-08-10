// 1.FizzBuzz 

// Print numbers 1 to 50. For multiples of 3, print "Fizz". For multiples of 5, print "Buzz". For multiples of both, print "FizzBuzz". Otherwise print the number.
// Practices: loops, conditionals, modulo operator

for (let i = 1; i < 50; i++) {
    if (i % 3 == 0 && i % 5 == 0) {
        console.log("FizzBuzz", i);
    }
    else if (i % 5 == 0) {
        console.log("Buzz", i);
    }
    else if (i % 3 == 0) {
        console.log("Fizz", i);
    }
    else {
        console.log("number", i);
    }
}


// 2.Reverse a String

// Write a function reverseString(str) that takes a string and returns it reversed — without using the built-in .reverse() method.
// Practices: loops, string/array manipulation, function basics

function reverseString(str) {
    let reverseStr = "";
    for (let i = str.length - 1; i >= 0; i--) {
        reverseStr = reverseStr + str[i];

    }
    console.log("reverseString////", reverseStr);
}
reverseString("hello");


// 3.Find the Largest Number in an Array

// Write a function findMax(arr) that returns the largest number in an array — without using Math.max().
// Practices: loops, comparison logic, array iteration


function findMax(arr) {
    let max=arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    console.log("max", max);

}
findMax([2, 7, 3, 4, 7, 9, 4, 5]);

//4. Count Vowels

// Write a function countVowels(str) that counts how many vowels (a, e, i, o, u) are in a given string.
// Practices: loops, conditionals, string handling, includes()

const vowels = ["a", "e", "i", "o", "u"]

function countVowels(str) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (vowels.includes(str[i])) {
            count++;
        }
    }
    console.log("count", count);

}

countVowels("Deepanshi");

//5. Palindrome Checker

// Write a function isPalindrome(str) that checks whether a word or phrase reads the same backward as forward (e.g., "madam", "racecar"). Bonus: make it ignore spaces and capitalization.
// Practices: string manipulation, logic, combining earlier concepts

function isPalindrome(str) {
    let palindrome = "";
    for (let i = str.length - 1; i >= 0; i--) {
        palindrome = palindrome + str[i];
    }
    if (str === palindrome) {
        console.log(str, "is a palindrome");
    }
    else {
        console.log(str, "is not a palindrome");
    }
}

isPalindrome("manvi");