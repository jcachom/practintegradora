const form = document.getElementById("loginform");
const texterror = document.getElementById("texterror");
const btnIngresar = document.getElementById("btnIngresar");
const btnIngresarGitHub = document.getElementById("btnIngresarGitHub");

const textemail = document.getElementById("email");
const textpassword = document.getElementById("password");

btnIngresar.addEventListener("click", (evt) => {
  texterror.innerHTML = "Validando autenticación.";

  const data = new FormData(form);
  const obj = {
    email: textemail.value,
    password: textpassword.value,
  };

  fetch("/api/sessions/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: { "Content-type": "application/json" },
  })
    .then((result) => result.json())
    .then((json) => {
      if (json.status == "success") {
        console.log(json.user);
        location.href =
          "http://localhost:8080/products?email=" +
          json.email +
          "&rol=" +
          json.role;
      } else {
        texterror.innerHTML = json.message;
      }
    });
});

 