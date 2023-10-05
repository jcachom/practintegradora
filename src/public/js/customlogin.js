const form = document.getElementById("loginform");
const texterror = document.getElementById("texterror");
const btnIngresar = document.getElementById("btnIngresar");
const btnIngresarGitHub = document.getElementById("btnIngresarGitHub");

const textemail = document.getElementById("email");
const textpassword = document.getElementById("password");

btnIngresar.addEventListener("click", (evt) => {
  texterror.innerHTML = "Iniciando.";

  const obj = {
    email: textemail.value,
    password: textpassword.value,
  };

  fetch("/api/sessionscustom/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: { "Content-type": "application/json" },
  })
    .then((result) => result.json())
    .then((json) => {
      if (json.status == "OK") {
        let user = json.payload;
        console.log(user);
        location.href =
          "http://localhost:8080/products?email=" +
          user.email +
          "&rol=" +
          user.role;
      } else {
        texterror.innerHTML = json.msg;
      }
    });
});
