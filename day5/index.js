//average
// const arr=[1,2,3,4,4,5,6];
// let sum=0;
// for(i=0; i<arr.length; i++){
//  sum=sum + arr[i];
// }
// let average= sum/arr.length
// console.log(average);




//form code

const container = document.querySelector(".container");
const showHide = document.querySelectorAll(".showHide");
const pwFields = document.querySelectorAll(".password");

showHide.forEach((eyedrop) => {
    eyedrop.addEventListener("click", () => {
        pwFields.forEach((pw) => {
            if (pw.type === "password") {
                pw.type = "text"
            } else {
                pw.type = "password";
            }
        })
    })
})
const signup = document.getElementById("signup");
const register = document.getElementById("register");
const registrationForm = document.getElementById("registration-form");
const LoginForm = document.getElementById("login-form");
const nameInput = document.getElementById("registerName");
const emailInput = document.getElementById("registerEmail");
const passwordInput = document.getElementById("registerPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");
register.addEventListener("click", (e) => {
    e.preventDefault();
    registrationForm.classList.add("hidden");
    LoginForm.classList.remove("hidden");
});

signup.addEventListener("click", (e) => {
    e.preventDefault();
    registrationForm.classList.remove("hidden");
    LoginForm.classList.add("hidden");
});
