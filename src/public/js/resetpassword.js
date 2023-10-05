 
 
const btnsendemail = document.getElementById("btnsendemail");
const textemail = document.getElementById("email");
const texterror = document.getElementById("texterror");

btnsendemail.addEventListener("click", (evt) => {
  texterror.innerHTML = "Iniciando.";

  if (textemail.value==""){
    texterror.innerHTML ="Ingrese correo."
    return
  }

 
  const obj = {
    email: textemail.value
  };
 
  fetch("/api/users/resetemailpassw", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: { "Content-type": "application/json" },
  })
    .then((result) => result.json())
    .then((json) => {
      if (json.status=="OK"){
        texterror.innerHTML ="Revisar su bandeja para restablecer su contraseña."
        btnsendemail.enabled=false;
      }else {
        texterror.innerHTML=json.message
      }
      

    });
});
