// 1. Build a button that displays how many times it's been clicked, updating a <span> each time.

const btnValue = document.getElementById("btnValue");
const countValue = document.getElementById("countValue");
let count = 0;
btnValue.addEventListener("click", () => {
    count++;
    countValue.textContent = count;
})

//2. As a user types into an <input>, display the text live in a <p> below it.

const inputValue = document.getElementById("inputValue");
const para = document.getElementById("para");
console.log(inputValue);
inputValue.addEventListener("input", () => {
    console.log(inputValue.value);
    para.textContent = inputValue.value;
})

// 3.Given a <ul> of items, clicking any <li> should toggle a "strikethrough" class on it (like marking a to-do as done).

const list = document.querySelectorAll("#list li");

list.forEach((item) => {
    item.addEventListener("click", (e) => {
        item.classList.toggle("line-through");
    })
})
console.log(list);


//3.Given a list of items and a search <input>, hide any <li> that doesn't match what's typed (live filtering as you type).

const searchValue = document.querySelector("#searchValue");
const itemList = document.querySelectorAll("#itemList li");
searchValue.addEventListener("input", () => {
    const searchItem = searchValue.value.toLowerCase();
    itemList.forEach((item) => {
        if (item.textContent.toLowerCase().includes(searchItem)) {
            item.classList.add("block")
        } else {
            item.classList.add("hidden")
        }
    })
})

//4.Attach a single click listener to a parent <ul> (not to each <li> individually) that logs the text of whichever <li> was clicked.
const ul = document.querySelector("#menuList");
const menuList = document.querySelectorAll("#menuList li");

ul.addEventListener("click", (e) => {
    console.log(e.target.textContent, "clicked");
})
