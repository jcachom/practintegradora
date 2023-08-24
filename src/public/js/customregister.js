const form = document.getElementById("registerform");
const texterror = document.getElementById("texterror");



const first_name = document.getElementById("first_name");
const last_name = document.getElementById("last_name");
const age = document.getElementById("age");
const email = document.getElementById("email");


form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  //const data = new FormData(form);
  
  /*
  <input name="first_name" id="first_name"  placeholder="Nombre"  />
    <input name="last_name" id="last_name"  placeholder="Apellido"  />
        <input name="age" id="age" type="number"  placeholder="Edad"  />
          <input name="email"  id="email" placeholder="Email"  />
             <input type="age"  name="password"  placeholder="password"  /> <br><br>
             </br>
             */
 //birthDate:"10/12/2023",
 let edad=  Number(age.value);
  
  const obj = {
   
      first_name:first_name.value,
      last_name :last_name.value,
      email : email.value,        
      gender:"M",
      role:"user",
      age:edad
 
  };

  fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: { "Content-type": "application/json" },
  })
    .then((result) => result.json())
    .then((json) => {
      texterror.innerHTML=json.msg;
      if (json.status=="OK") texterror.innerHTML="Usuario creado.";
      
    });
  });
  /*
  data.forEach((value, key) => (obj[key] = value));
  //fetch("/api/sessionscustom/register", {
    fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: { "Content-type": "application/json" },
  })
    .then((result) => result.json())
    .then((json) => {
      texterror.innerHTML = json.message;
    });

*/