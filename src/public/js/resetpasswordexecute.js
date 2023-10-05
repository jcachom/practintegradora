 
 
const btnAceptar = document.getElementById("btnAceptar");
const textpwd = document.getElementById("password");
const hdtoken = document.getElementById("hdtoken");
const texterror = document.getElementById("texterror");

btnAceptar.addEventListener("click", (evt) => {
  texterror.innerHTML = "Iniciando.";

  if (hdtoken.value==""){
    texterror.innerHTML ="Token no válido."
    return
  }

  if (textpwd.value==""){
    texterror.innerHTML ="Ingresar password."
    return
  }

  
  const obj = {
     token : hdtoken.value , 
    newpwd: textpwd.value
  };
  
  fetch("/api/users/resetemailverify", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: { "Content-type": "application/json" },
  })
    .then((result) => result.json())
    .then((json) => {
      if (json.status=="OK"){
        texterror.innerHTML ="Se ha asignado una nueva contraseña."
       
      }else {

        texterror.innerHTML=json.msg
        if (json.payload !=null && json.payload.hasOwnProperty("expiration") ){         
          location.href = "http://localhost:8080/resetemail";
        } 
 
      }
      

    });
});
