const form = document.getElementById("registerform");
const texterror = document.getElementById("texterror");

const first_name = document.getElementById("first_name");
const last_name = document.getElementById("last_name");
const age = document.getElementById("age");
const email = document.getElementById("email");

form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let edad = Number(age.value);

  const obj = {
    first_name: first_name.value,
    last_name: last_name.value,
    email: email.value,
    gender: "M",
    role: "user",
    age: edad,
  };

  fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: { "Content-type": "application/json" },
  })
    .then((result) => result.json())
    .then((json) => {
      texterror.innerHTML = json.msg;
      if (json.status == "OK") texterror.innerHTML = "Usuario creado.";
    });
});
