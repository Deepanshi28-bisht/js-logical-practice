const phone = document.getElementById("phone");
const email = document.getElementById("email");
const street = document.getElementById("street-address");
const city = document.getElementById("city");
const state = document.getElementById("state");
const postal = document.getElementById("postal-code");
const cardNum = document.getElementById("card-num");
const cardExp = document.getElementById("card-expiry");
const cardCvc = document.getElementById("card-cvc");
const previousBtn = document.querySelector(".previousBtn");
const nextBtn = document.querySelector(".nextBtn");
const circles = document.querySelectorAll(".circle");
const form = document.getElementById("multi-step-form");
let currentTab = 0;
let formdata = {
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "",
    postal: "",
};
loadData();
function showTab(n) {
    const steps = document.querySelectorAll(".step");

    steps.forEach((step) => {
        step.classList.add("hidden");
        step.classList.remove("block");
    });

    steps[n].classList.remove("hidden");
    steps[n].classList.add("block");
    if (n === 0) {
        previousBtn.classList.add("hidden");
    } else {
        previousBtn.classList.remove("hidden");
    }
    if (n === steps.length - 1) {
        nextBtn.textContent = "Submit";
        nextBtn.type = "submit";
    } else {
        nextBtn.textContent = "Next";
    }
    circles.forEach((circle, index) => {
        if (index === n) {
            circle.classList.replace("opacity-25", "opacity-100");
        } else {
            circle.classList.replace("opacity-100", "opacity-25");
        }
    })
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("form submitted");
    console.log("formdata", formdata);
    localStorage.removeItem("formdata");
    localStorage.removeItem("currentTab");

    form.reset();

    formdata = {
        phone: "",
        email: "",
        street: "",
        city: "",
        state: "",
        postal: "",
    };

    currentTab = 0;
    showTab(currentTab);
})

function loadData() {
    const savedData = localStorage.getItem("formdata");
    const savedTab = localStorage.getItem("currentTab");

    if (savedData) {
        formdata = JSON.parse(savedData);

        phone.value = formdata.phone || "";
        email.value = formdata.email || "";
        street.value = formdata.street || "";
        city.value = formdata.city || "";
        state.value = formdata.state || "";
        postal.value = formdata.postal || "";
    }

    if (savedTab !== null) {
        currentTab = Number(savedTab);
    }

    showTab(currentTab);
}
function saveData() {
    localStorage.setItem("formdata", JSON.stringify(formdata));
    localStorage.setItem("currentTab", currentTab);
}
nextBtn.addEventListener("click", () => {
    let isValid = true;
    if (currentTab === 0) {
        isValid = validatePhone() && validateEmail();
        if (isValid) {
            formdata = { ...formdata, phone: phone.value.trim(), email: email.value.trim() };
            console.log(saveData());

        }
    }
    else if (currentTab === 1) {
        isValid = validateStreet() && validateCity() && validatePostal() && validateState();
        if (isValid) {
            formdata = { ...formdata, street: street.value.trim(), city: city.value.trim(), state: state.value.trim(), postal: postal.value.trim(), };
        }
    }
    else if (currentTab === 2) {
        isValid = validateCard() && ValidateExpCard() && validateCVV();
    }
    if (isValid) {
        if (currentTab < document.querySelectorAll(".step").length - 1) {
            currentTab++;
            saveData();
            showTab(currentTab);
        }
    }
})
previousBtn.addEventListener("click", () => {
    if (currentTab > 0) {
        currentTab--;
        saveData();
        showTab(currentTab);
    }
});
function validatePhone() {
    const value = phone.value.trim();

    if (!value) {
        alert("Please enter your phone number");
        return false;
    }

    if (!/^[6-9]\d{9}$/.test(value)) {
        alert("Please enter a valid 10-digit phone number");
        return false;
    }

    return true;
}

function validateEmail() {
    const value = email.value.trim();

    if (!value) {
        alert("Please enter your email");
        return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        alert("Please enter a valid email");
        return false;
    }

    return true;
}

function validateStreet() {
    const value = street.value.trim();

    if (!value) {
        alert("Please enter your street address");
        return false;
    }

    if (value.length < 5) {
        alert("Please enter a valid street address");
        return false;
    }

    return true;
}

function validateCity() {
    const value = city.value.trim();

    if (!value) {
        alert("Please enter your city");
        return false;
    }

    if (!/^[a-zA-Z\s-]+$/.test(value)) {
        alert("Please enter a valid city");
        return false;
    }

    return true;
}

function validateState() {
    const value = state.value.trim();

    if (!value) {
        alert("Please enter your state");
        return false;
    }

    if (!/^[a-zA-Z\s-]+$/.test(value)) {
        alert("Please enter a valid state");
        return false;
    }

    return true;
}

function validatePostal() {
    const value = postal.value.trim();

    if (!value) {
        alert("Please enter your postal code");
        return false;
    }

    if (!/^\d{6}$/.test(value)) {
        alert("Please enter a valid 6-digit postal code");
        return false;
    }

    return true;
}

function validateCard() {
    const value = cardNum.value.trim();
    if (!value) {
        alert("Please enter your card number");
        return false;
    }
    if (!/^\d{13,19}$/.test(value)) {
        alert("enter valid card number")
        return false
    }
    return true;
}
function ValidateExpCard() {

    const value = cardExp.value.trim();
    if (!value) {
        alert("please enter your card expiry date")
        return false
    }
    const match = value.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
    if (!match) {
        return false
    }
    const month = Number(match[1]);
    const year = Number(`20${match[2]}`);
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    if (
        year < currentYear ||
        (year === currentYear && month < currentMonth)
    ) {
        alert("please enter correct year")
        return false;
    }
    return true;
}

function validateCVV() {
    const value = cardCvc.value.trim();
    if (!value) {
        alert("please enter cvv pin")
        return false
    }
    if (!/^\d{3,4}$/.test(value)) {
        alert("Please enter a valid CVV");
        return false;
    }
    return true
}
