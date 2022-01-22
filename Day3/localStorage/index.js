const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const emailInput = document.getElementById("email");
const submitBtn = document.getElementById("submit");

submitBtn.onclick = function () {
  let name = nameInput.value,
    age = ageInput.value,
    email = emailInput.value;
  let userData = {
    name,
    age,
    email,
  };
  localStorage.setItem("userData", JSON.stringify(userData));
};
