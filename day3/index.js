const input = document.getElementById("input");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
let listValue = JSON.parse(localStorage.getItem("toDoValue")) || [];
console.log("hyyy", listValue);
const dropdown = document.querySelector("#dropdown");
const filterTask = () => {
    const value = dropdown.value;
    switch (value) {
        case "completed":
            return listValue.filter(item => item.completed);
        case "notCompleted":
            return listValue.filter(item => !item.completed);
        default:
            return listValue;
    }
}
const renderTask = () => {
    taskList.innerHTML = "";
    const tasks = filterTask();
    tasks.forEach((item, index) => {
        const list = document.createElement("li");
        list.classList.add("flex", "gap-5", "lg:gap-10", "items-center", "w-full", "bg-white/70", "rounded-xl", "px-2", "lg:px-3", "py-3", "lg:py-4", "shadow-sm", "border", "border-sky-50");
        list.innerHTML = `
  <span class="text-base text-center lg:text-start flex-1 ${item.completed ? "line-through text-gray-500" : ""}">
    ${item.title}
  </span>
        <div class="flex gap-2 items-center justify-center">
       <button class="editBtn px-4 py-2 text-sm bg-green-500 rounded-lg text-[#fff]">Edit</button>
      <button class="deleteBtn px-4 py-2 text-sm bg-red-500 rounded-lg text-[#fff]">Delete</button>
       <input type="checkbox" class="checkValue">
       </div>
        `;
        const checkBtn = list.querySelector(".checkValue");
        checkBtn.addEventListener("change", () => toggleTask(index));
        checkBtn.checked = item.completed;
        const deleteBtn = list.querySelector(".deleteBtn");
        const editBtn = list.querySelector(".editBtn");
        deleteBtn.addEventListener("click", () => deleteTask(index));
        editBtn.addEventListener("click", () => editTask(index));
        taskList.appendChild(list);
    });
};
dropdown.addEventListener("change", renderTask);
const toggleTask = (index) => {
    listValue[index].completed = !listValue[index].completed;
    localStorage.setItem("toDoValue", JSON.stringify(listValue));
    renderTask();
}
let isEditingIndex = null;
addBtn.addEventListener("click", () => {
    const inputValue = input.value;

    if (!inputValue.trim()) {
        alert("please enter any value");
        return;
    } else if (inputValue.length < 2) {
        alert("please enter valid value");
        return;
    } else if (isEditingIndex !== null) {
        listValue[isEditingIndex].title = inputValue;
        localStorage.setItem("toDoValue", JSON.stringify(listValue));
        isEditingIndex = null;
    } else {
        listValue.push({ title: inputValue, completed: false });
        localStorage.setItem("toDoValue", JSON.stringify(listValue));
    }
    input.value = "";
    renderTask();
});

const deleteTask = (index) => {
    listValue.splice(index, 1);
    localStorage.setItem("toDoValue", JSON.stringify(listValue));
    renderTask();
};
const editTask = (index) => {
    isEditingIndex = index;
    input.value = listValue[index].title;
};
renderTask();
