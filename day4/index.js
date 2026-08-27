function hasDuplicates(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        return true;
      }
    }
  }
}
console.log(hasDuplicates([9, 4, 2, 3, 4, 1, 3, 5, 8, 9]));

function secondLargest(arr) {
  let largest = -Infinity;
  let second = -Infinity;
  for (num of arr) {
    if (num > largest) {
      second = largest;
      largest = num;
    } else if (num > second && num !== largest) {
      second = num;
    }
  }
  return second;
}
console.log(secondLargest([9, 4, 2, 3, 4, 1, 3, 5, 8, 9]));

function wordFrequency(str) {
  let words = str.split(" ");
  let frequency = {};
  for (word of words) {
    if (frequency[word]) {
      frequency[word]++;
    } else {
      frequency[word] = 1;
    }
  }
  return frequency;
}
console.log(wordFrequency("Harsh Manvi Harsh Manvi Mummy Harsh"));

function sumOfDigits(num) {
  let sum = 0;
  while (num > 0) {
    let digit = num % 10;
    sum = sum + digit;
    num = Math.floor(num / 10);
  }
  return sum;
}
console.log(sumOfDigits(2377));

function chunkArray(arr, size) {
  let result = [];
  let temp = [];
  for (let i = 0; i < arr.length; i++) {
    temp[temp.length] = arr[i];
    if (temp.length === size || i === arr.length - 1) {
      result[result.length] = temp;
      temp = [];
    }
  }
  console.log(result);
}
chunkArray([1, 3, 4, 2, 3, 4, 5, 5, 5, 4, 3, 2], 4);

let allPosts = [];
async function getData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    console.log(data, "data////");
    allPosts = data;

    showData(allPosts);
  } catch (err) {
    console.log("error is", err);
  }
}

getData();
const mainDiv = document.querySelector(".mainDiv");
function showData(users) {
  mainDiv.innerHTML = "";
  users.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add(
      "bg-sky-200",
      "p-5",
      "rounded-lg",
      "flex",
      "flex-col",
      "gap-4",
      "items-start",
      "justify-center",
    );
    div.innerHTML = `
        <span class="text-2xl font-semibold">Title - <span class="text-xl font-normal">${item.title} </span></span>
        <p class="text-base text-gray-500">${item.body}</p>
        `;
    mainDiv.appendChild(div);
  });
}
const input = document.getElementById("inputValue");
input.addEventListener("input", () => {
  const inputValue = input.value.toLowerCase();
  const filteredPosts = [];
  allPosts.forEach((item) => {
    if (item.title.toLowerCase().includes(inputValue)) {
      filteredPosts.push(item);
    }
  });
  showData(filteredPosts);
});
