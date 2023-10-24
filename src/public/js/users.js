const texterror = document.getElementById("texterror");
const btnBuscar = document.getElementById("btnBuscar");

function GetOptionCombo(opionDefault) {
  let listOpciones = "";
  let select = "";
  listOpciones = "<option value=''></option>";
  let listRol = [];
  listRol.push({
    cod: "premiun",
    rol: "premiun",
  });
  listRol.push({
    cod: "user",
    rol: "user",
  });

  listRol.forEach(function (item, index) {
    select = "";
    if (item.cod == opionDefault) {
      select = " selected";
    }
    listOpciones +=
      "<option value='" +
      item.cod +
      "'" +
      select +
      ">" +
      item.rol +
      "</option>";
  });

  return listOpciones;
}

btnBuscar.addEventListener("click", (evt) => {
  texterror.innerHTML = "";

  fetch("/api/users/main", {
    method: "GET",
    headers: { "Content-type": "application/json" },
  })
    .then((result) => {
      if (result.status == "401") {
        let json = {
          status: "ERROR",
          msg: "Usuario no autorizado.",
        };
        return json;
      } else {
        return result.json();
      }
    })
    .then((data) => {
      let html = "";
      data.forEach((item) => {
        html =
          html +
          `<tr class='even pointer' id='row_${item._id}'>
        <td>${item.email} </td>
        <td width='100'>

        <select id='cborol_${item._id}'     
              class='form-control' >${GetOptionCombo(item.role)}
        </select>
       
        </td >

          <td> <button class='btn btn-sm btn-outline-danger py-0 class_update' id='btnupdate_${
            item._id
          }' >Actualizar
 
</button> </td>
<td> <button class='btn btn-sm btn-outline-danger py-0 class_delete' id='btndelete_${
            item._id
          }' >Eliminar
 
</button> </td>
</tr>`;
      });

      let body = document.querySelector(`#tb_listuserbody`);
      body.innerHTML = html;
    });
});

document.body.addEventListener("click", (event) => {
  event.preventDefault();
  let mytarget = event.target;

  if (mytarget.className.includes("class_update")) {
    let idUser = mytarget.id.split("_")[1];
    let rol = document.getElementById(`cborol_${idUser}`);

    if (!rol.value) {
      texterror.innerHTML="Debe seleccionar un rol."
      return;
    }
    obj = {
      role: rol.value,
    };

    let ruta = `/api/users/${idUser}`;
    fetch(ruta, {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: { "Content-type": "application/json" },
    })
      .then((result) => result.json())
      .then((data) => {
        let msg = "No fue posible su actualización.";

        if (data.status == "OK") {
          msg = "Rol fue actualizado.";
        }
        texterror.innerHTML = msg;
      });
  }
  if (mytarget.className.includes("class_delete")) {
    let idUser = mytarget.id.split("_")[1];
    let ruta = `/api/users/${idUser}`;

    Swal.fire({
      title: "Eliminar",
      text: "¿Desea eliminar usuario?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
    }).then(function (result) {
      if (result.value) {
        fetch(ruta, {
          method: "DELETE",
          headers: { "Content-type": "application/json" },
        })
          .then((result) => result.json())
          .then((data) => {
            let msg = "Usuario no pudo ser eliminado.";

            if (data.status == "OK") {
              msg = "Usuario fue eliminado.";
              document.getElementById(`row_${idUser}`).remove();
            }
            texterror.innerHTML = msg;
          });
      }
    });
  }
});
