const income = document.getElementById("income");
const expense = document.getElementById("expense");
const desc = document.getElementById("desc");
const amount = document.getElementById("amount");
const expenseForm = document.getElementById("expenseForm");
const tasks = document.getElementById("tasks");
const curBalance = document.getElementById("curBalance");
const date = document.getElementById("date");
const incomeType = document.getElementById("type");
const descError = document.getElementById("descError");
const amountError = document.getElementById("amountError");
const dateError = document.getElementById("dateError");
const typeError = document.getElementById("typeError");
const category = document.getElementById("category");
const categoryError = document.getElementById("categoryError");
const categorySummary = document.getElementById("categorySummary");
let itemArray = JSON.parse(localStorage.getItem("itemArray")) || [];
date.addEventListener("click", () => {
    date.showPicker();
});
expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const descValue = desc.value.trim();
    const amountValue = parseFloat(amount.value);
    const dateValue = date.value;
    const incomeTypeValue = incomeType.value;
    const categoryValue = category.value;
    let isValid = true;
    descError.textContent = "";
    amountError.textContent = "";
    dateError.textContent = "";
    typeError.textContent = "";
    categoryError.textContent = "";
    if (!descValue) {
        descError.textContent = "Description is required";
        isValid = false;
    } else if (descValue.length > 60) {
        descError.textContent = "Please enter a short description (max 60 characters)";
        isValid = false;
    }
    if (!amount.value) {
        amountError.textContent = "Amount is required";
        isValid = false;
    } else if (amountValue <= 0) {
        amountError.textContent = "Please enter a value greater than 0";
        isValid = false;
    }
    if (!dateValue) {
        dateError.textContent = "Date is required";
        isValid = false;
    }
    if (incomeTypeValue === "select") {
        typeError.textContent = "Please select income or expense";
        isValid = false;
    }
    if (categoryValue === "select") {
        categoryError.textContent = "Please select a category";
        isValid = false;
    }
    if (!isValid) {
        return
    }
    itemArray.push({
        id: Date.now(),
        descValue,
        dateValue,
        amountValue,
        incomeTypeValue,
        categoryValue
    })
    localStorage.setItem("itemArray", JSON.stringify(itemArray))
    desc.value = "";
    amount.value = "";
    date.value = "";
    incomeType.value = "select";
    category.value = "select";
    updateList();
    updateAmount();
    updateCategory();
})
console.log(itemArray);
function updateList() {
    tasks.innerHTML = "";
    itemArray.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("flex", "justify-between", "w-full", "shadow-md", "p-4", "rounded-lg", "group", "border-r-4", item.incomeTypeValue === "income"
            ? "border-green-300"
            : "border-red-500")
        li.innerHTML = `
        <span>${item.descValue}</span>
        <div class="flex items-center gap-4">
         <span>${item.amountValue} </span>
         <i class="fa-solid fa-trash-can text-red-800 opacity-0 group-hover:opacity-100" onclick="deletebtn(${item.id})"></i>
         </div>
        `
        tasks.appendChild(li)
    });
}
function deletebtn(id) {
    itemArray = itemArray.filter((item) => item.id !== id)
    localStorage.setItem("itemArray", JSON.stringify(itemArray));
    updateList();
    updateAmount();
    updateCategory();
}

function updateAmount() {
    const incomeValue = itemArray.filter((item) => item.incomeTypeValue === "income").reduce((acc, item) => {
        return acc + item.amountValue;
    }, 0)
    const expenseValue = itemArray.filter((item) => item.incomeTypeValue === "expense").reduce((acc, item) => {
        return acc + item.amountValue;
    }, 0)
    const curBalanceValue = incomeValue - expenseValue;
    curBalance.textContent = `$${curBalanceValue}`;
    income.textContent = `$${incomeValue}`;
    expense.textContent = `$${expenseValue}`;
}
function updateCategory() {
    categorySummary.innerHTML = "";
    const categories = {
        food: 0,
        transport: 0,
        shopping: 0,
        bills: 0,
        other: 0
    };
    itemArray.forEach((item) => {
        if (item.incomeTypeValue === "expense") {
            categories[item.categoryValue] += item.amountValue;
        }
    });

    const totalExpenses = Object.values(categories).reduce(
        (total, amount) => total + amount,
        0
    );
   const sortedCategories = Object.entries(categories)
    .filter(([categoryName, total]) => total > 0);
sortedCategories.sort((a, b) => b[1] - a[1]);
    if (sortedCategories.length === 0) {
        categorySummary.innerHTML = `
            <p class="text-gray-500">
                No expenses to display.
            </p>
        `;
        return;
    }
    sortedCategories.forEach(([categoryName, total]) => {
        const percentage = (total / totalExpenses) * 100;

        const categoryItem = document.createElement("div");

        categoryItem.className =
            "flex flex-col gap-2 w-full bg-gray-100 py-3 px-4 rounded-lg";
        categoryItem.innerHTML = `
            <div class="flex justify-between items-center">
                <span class="font-semibold capitalize">
                    ${categoryName}
                </span>

                <div class="flex items-center gap-3">
                    <span class="font-bold text-red-600">
                        $${total}
                    </span>

                    <span class="text-sm font-semibold text-gray-600">
                        ${percentage.toFixed(1)}%
                    </span>
                </div>
            </div>

            <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                    class="bg-red-500 h-2 rounded-full"
                    style="width: ${percentage}%"
                ></div>
            </div>
        `;

        categorySummary.appendChild(categoryItem);
    });
}
updateCategory();
updateList();
updateAmount();