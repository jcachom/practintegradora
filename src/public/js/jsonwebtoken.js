const form = document.getElementById("loginform");
const texterror = document.getElementById("texterror");

const btngenerarjwt = document.getElementById("btngenerarjwt");
const btnIngresar = document.getElementById("btnIngresar");
const btnPrintCookie = document.getElementById("btnPrintCookie");

const textemail = document.getElementById("email");
const textpassword = document.getElementById("password");

btngenerarjwt.addEventListener("click", (evt) => {
  texterror.innerHTML = "Iniciando.";

 

  if (textemail.value == "" || textpassword.value == "") {
    texterror.innerHTML = "Completar campos.";
    return;
  }

  const obj = {
    email: textemail.value,
    password: textpassword.value,
  };

  fetch("/api/jwt/jwtlogin", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: { "Content-type": "application/json" },
  })
    .then((result) => result.json())
    .then((c) => {
      localStorage.setItem("authtoken", c.acces_token);
      texterror.innerHTML = "token generado";
      //location.href ="http://localhost:8080/products"
    });
});

btnIngresar.addEventListener("click", (evt) => {
  const obj = {};
  texterror.innerHTML = "Inicio validación";
  fetch("/api/jwt/jwtcurrent", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    },
  })
    .then((result) => result.json())
    .then((c) => {
      texterror.innerHTML = "token validado";
    });
});

btnPrintCookie.addEventListener("click", (evt) => {
  texterror.innerHTML = "";

  /*
  const obj = {"email":"jcachom@hotmail.com",
  "password": "1234" };
  */
  if (textemail.value == "" || textpassword.value == "") {
    texterror.innerHTML = "Completar campos.";
    return;
  }
  const obj = {
    email: textemail.value,
    password: textpassword.value,
  };

  fetch("/api/jwt/jwtlogincookie", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: { "Content-type": "application/json" },
  })
    .then((result) => result.json())
    .then((json) => {
      console.log(document.cookie);
      texterror.innerHTML = "cookie generado";
    });
});
