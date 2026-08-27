const bookList = document.getElementById("bookList");
const title = document.getElementById("title");
const author = document.getElementById("author");
const page = document.getElementById("page");
const bookForm = document.getElementById("bookForm");
const titleError = document.getElementById("titleError");
const authorError = document.getElementById("authorError");
const pageError = document.getElementById("pageError");
let booksArray = JSON.parse(localStorage.getItem("booksArray")) || [];
const booksDropdown = document.getElementById("booksDropdown");
const search = document.getElementById("search");
const totalBooks = document.getElementById("totalBooks");
const readBooks = document.getElementById("readBooks");
const unreadBooks = document.getElementById("unreadBooks");
const noData = document.getElementById("noData");
const bookImage = document.getElementById("bookImage");
const imageError = document.getElementById("imageError");
search.addEventListener("input", () => {
    renderList();
});
bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addBtn();
});
function addBtn() {
    const titleValue = title.value.trim();
    const authorValue = author.value.trim();
    const pageValue = parseFloat(page.value);
    const file = bookImage.files[0];
    let isValid = true;
    if (!titleValue) {
        titleError.textContent = "Please enter a book title";
        isValid = false;
    } else if (titleValue.length < 6) {
        titleError.textContent = "title should be above 6 characters";
        isValid = false;
    } else if (titleValue.length > 50) {
        titleError.textContent = "Enter a short title";
        isValid = false;
    }
    if (!authorValue) {
        authorError.textContent = "Please enter the author name";
        isValid = false;
    } else if (authorValue.length < 3) {
        authorError.textContent = "Author name is too short";
        isValid = false;
    } else if (authorValue.length > 20) {
        authorError.textContent = "Author name is too long";
        isValid = false;
    }
    if (pageValue < 0 || isNaN(pageValue)) {
        pageError.textContent = "Please enter positive number";
        isValid = false;
    }
    if (!file) {
        imageError.textContent = "Please select an image";
        isValid = false;
    }
    if (isValid) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageData = e.target.result;
            booksArray.push({
                title: titleValue,
                author: authorValue,
                page: pageValue,
                read: false,
                image: imageData,
            });
            booksArray.sort((a, b) => a.page - b.page)
            localStorage.setItem("booksArray", JSON.stringify(booksArray));
            renderList();
            updateBookData();
            title.value = "";
            author.value = "";
            page.value = "";
            bookImage.value="";
            titleError.textContent = "";
            authorError.textContent = "";
            pageError.textContent = "";
            imageError.textContent = "";
        }
        reader.readAsDataURL(file);
    }
}
const filterBooks = () => {
    const value = booksDropdown.value;
    switch (value) {
        case "read":
            return booksArray.filter((item) => item.read);
        case "unread":
            return booksArray.filter((item) => !item.read);
        default:
            return booksArray;
    }
};
function updateBookData() {
    const totalBooksValue = booksArray.length;
    const readBooksValue = booksArray.filter((item) => item.read);
    const unreadBooksValue = booksArray.filter((item) => !item.read);
    totalBooks.textContent = `Total ${totalBooksValue}`;
    readBooks.textContent = `Read ${readBooksValue.length}`;
    unreadBooks.textContent = `Unread ${unreadBooksValue.length}`;
}
booksDropdown.addEventListener("change", renderList);
function renderList() {
    bookList.innerHTML = "";
    const searchValue = search.value.trim().toLowerCase();
    let booksFilter = filterBooks();
    if (searchValue) {
        booksFilter = booksFilter.filter((item) => {
            return item.title.toLowerCase().includes(searchValue);
        });
    }
    if (booksFilter.length === 0) {
        noData.innerHTML = `
            <div class="flex flex-col gap-2 items-center w-full">
                <h4 class="text-gray-500 text-2xl">OOPS!</h4>
                <p class="text-gray-500 text-xl">No books to display.</p>
            </div>
        `;
        noData.classList.remove("hidden");
    } else {
        noData.innerHTML = "";
        noData.classList.add("hidden");
    }

    booksFilter.forEach((item) => {
        const originalIndex = booksArray.indexOf(item);
        const div = document.createElement("div");
        div.classList.add(
            "flex",
            "flex-col",
            "items-start",
            "justify-center",
            "gap-2",
            "shadow-md",
            "rounded-lg",
            "overflow-hidden",
            "bg-[#EEEAF5]",
            "group",
            "cursor-pointer",
            "w-full",
        );
        div.innerHTML = `
           <div class="h-[250px] w-full">
           <img src="${item.image}"
    alt="${item.title}" class="h-full w-full">
            </div>

            <div class="flex flex-col gap-1 px-3 py-2 w-full">
           <h4 class="text-[#30203D] font-semibold text-lg">${item.title}</h4>
           <div class="flex w-full justify-between w-full items-center">
           <div class="flex flex-col gap-1">
           <span class="text-[#6B5B73] text-sm">Written by ${item.author}</span>
           <span class="text-[#887A91] text-xs">${item.page ? `${item.page} Pages` : ""}</span>
           </div>
           <i class="fa-solid fa-trash-can text-red-600 opacity-0 group-hover:opacity-100" onclick="removeBook(${originalIndex})"></i>
           </div>
           <div class="flex gap-2 items-center">
           <input type="checkbox" class="checkValue"
                        ${item.read ? "checked" : ""}>
           <span class="text-sm text-red-800">${item.read ? "Read" : "Unread"}</span>
           </div>
           </div>
        `;
        const checkBtn = div.querySelector(".checkValue");
        checkBtn.addEventListener("change", () => updateStatus(originalIndex));
        checkBtn.checked = item.read;
        bookList.appendChild(div);
    });
}

function updateStatus(index) {
    booksArray[index].read = !booksArray[index].read;
    localStorage.setItem("booksArray", JSON.stringify(booksArray));
    renderList();
    updateBookData();
}
function removeBook(index) {
    booksArray.splice(index, 1);
    localStorage.setItem("booksArray", JSON.stringify(booksArray));
    renderList();
    updateBookData();
}
renderList();
updateBookData();
