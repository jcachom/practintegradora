let hdcart = document.getElementById("hdcart");
let email = document.getElementById("email");
let cantcart = document.getElementById("cantcart");
let texterror = document.getElementById("texterror");
let texterrorcart = document.getElementById("texterrorcart");

panel_show_hide("divpanel_list", "divpanel_cart");

function panel_show_hide(panelShow, panelHide) {
  let divpanelShow = document.querySelector(`#${panelShow}`);
  // divpanelShow.style.visibility = 'visible'
  divpanelShow.style.display = "block";

  let divpanelHide = document.querySelector(`#${panelHide}`);
  //divpanelHide.style.visibility = 'hidden'
  divpanelHide.style.display = "none";
}
//

document.querySelector("#btncatalogo").addEventListener("click", () => {
  panel_show_hide("divpanel_list", "divpanel_cart");
});

document.querySelector("#vercart").addEventListener("click", () => {
  getCartById(hdcart.value);
  panel_show_hide("divpanel_cart", "divpanel_list");
});

document.querySelector("#logout").addEventListener("click", () => {
  try {
    const data = new FormData();

    fetch("/api/sessions/logout", {
      method: "POST",

      headers: { "Content-type": "application/json" },
    })
      .then((result) => result.json())

      .then((json) => {
        if (json.status == "OK") location.href = "login";
      });
  } catch (e) {
    return false;
  }
});

cargaLogin();

function cargaLogin() {
  let url = "/api/sessions/current";
  fetch(url, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  })
    .then((result) => {
      if (result.status == "401") {
        location.href = "login";
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
      hdcart.value = data.user.cartId;
      email.innerHTML = data.user.email;
      if (hdcart.value == "") {
        createCart(data.user.email);
      } else {
        getCartById(data.user.cartId);
      }
    });
}

cargarProductos();

function createCart(email) {
  let obj = {
    email: email,
  };
  let url = "/api/carts";
  fetch(url, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: { "Content-type": "application/json" },
  })
    .then((result) => result.json())
    .then((data) => {
      if (data.status == "OK") {
        hdcart.value = data.payload._id;
        getCartById(data.payload._id);
      }
    });
}

function cargarProductos() {
  let url = "/api/products";
  fetch(url, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  })
    .then((result) => {
      if (result.status == "401") {
        location.href = "login";
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
      const listabody = document.getElementById("divlist");

      listabody.innerHTML = "";

      let listItems = "";
      data.payload.products.forEach((item) => {
        listItems =
          listItems +
          `<br> <div  class="tarjeta"> <br>
      <p id="msg_${item._id}" style="color:orange;font: size 20px ;font-weight:bold"></p>

       categoría : ${item.categoria} <br>
       code : ${item.code} <br>       
       description : ${item.description} <br>
       price : ${item.price} <br>
       stock : ${item.stock} <br>
      
       <input type="hidden" id="hdstock_${item._id}"   value=${item.stock}  >
       <div style="display:inline">
       Cantidad :
       <input id="txtcant_${item._id}" type="number"  />
       <button class='class_addcart' style="background-color:orange" id="product_${item._id}">Add carrito</button>

       </div>

       </div>
       <br>
       `;
      });
      listabody.innerHTML = listItems;
    });
}

document.body.addEventListener("click", (event) => {
  event.preventDefault();
  let mytarget = event.target;

  if (mytarget.className.includes("class_addcart")) {
    let idproduct = mytarget.id.split("_")[1];
    let txtcantproduct = document.getElementById(`txtcant_${idproduct}`);
    let hdstock = document.getElementById(`hdstock_${idproduct}`);
    let msgcart = document.getElementById(`msg_${idproduct}`);

    msgcart.innerHTML = "";

    let idCart = hdcart.value;

    if (idCart == "") {
      msgcart.innerHTML = "Cart no generado.";
      return;
    }
    let cantproduct = Number(txtcantproduct.value);
    let stock = Number(hdstock.value);

    if (cantproduct == 0) {
      msgcart.innerHTML = "Debe ingresar cantidad válida.";
      return;
    }

    if (cantproduct > stock) {
      msgcart.innerHTML = "Cantidad no disponible.";
      return;
    }

    let obj = {
      quantity: cantproduct,
      accion: "+",
    };

    let ruta = `/api/carts/${idCart}/product/${idproduct}`;
    fetch(ruta, {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: { "Content-type": "application/json" },
    })
      .then((result) => result.json())
      .then((data) => {
        txtcantproduct.value = "";

        msgcart.innerHTML = "Se adicionó producto al cart.";
        getCartById(idCart);

        console.log(data);
      });
  }

  if (mytarget.className.includes("class_quitar")) {
    let idproduct = mytarget.id.split("_")[1];
    let idCart = hdcart.value;
    let ruta = `/api/carts/${idCart}/product/${idproduct}`;
    fetch(ruta, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.status == "OK") getCartById(idCart); 
      });
  }

  if (mytarget.className.includes("class_editcart")) {
    let idproduct = mytarget.id.split("_")[1];
    let idCart = hdcart.value;
    let txtcantproduct = document.getElementById(`txtcantcart_${idproduct}`);
    let btneditcart = document.getElementById(`btneditcart_${idproduct}`);
    let btnupdatecart = document.getElementById(`btnupdatecart_${idproduct}`);
    let btncanceleditcart = document.getElementById(
      `btncanceleditcart_${idproduct}`
    );

    txtcantproduct.disabled = false;
    btneditcart.style.display = "none";
    btnupdatecart.style.display = "block";
    btncanceleditcart.style.display = "block";
  }

  if (mytarget.className.includes("class_updatecart")) {
    let idproduct = mytarget.id.split("_")[1];
    let txtcantproduct = document.getElementById(`txtcantcart_${idproduct}`);
    let hdstock = document.getElementById(`hdstockcart_${idproduct}`);
    let msgcart = document.getElementById(`texterrorcart`);

    msgcart.innerHTML = "";

    let idCart = hdcart.value;

    let cantproduct = Number(txtcantproduct.value);
    let stock = Number(hdstock.value);

    if (cantproduct == 0) {
      msgcart.innerHTML = "Debe ingresar cantidad válida.";
      return;
    }

    if (cantproduct > stock) {
      msgcart.innerHTML = "Cantidad no disponible.";
      return;
    }

    let obj = {
      quantity: cantproduct,
      accion: "=",
    };

    let ruta = `/api/carts/${idCart}/product/${idproduct}`;
    fetch(ruta, {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: { "Content-type": "application/json" },
    })
      .then((result) => result.json())
      .then((data) => {
        msgcart.innerHTML = "Se actualizó cantidad.";
        getCartById(idCart);
      });
  }

  if (mytarget.className.includes("class_canceleditcart")) {
    let idCart = hdcart.value;
    getCartById(idCart);
  }
});

document.querySelector("#btnconfirmar").addEventListener("click", () => {
  let idCart = hdcart.value;
  let ruta = `/api/carts/${idCart}/purchase`;

  Swal.fire({
    title: "Confirmación compra",
    text: "Se va a confirmar la compra.Desea continuar?",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Aceptar",
  }).then(function (result) {
    if (result.value) {
      fetch(ruta, {
        method: "POST",
        headers: { "Content-type": "application/json" },
      })
        .then((result) => result.json())
        .then((data) => {
          if (data.status == "OK") {
            getCartById(idCart);
            enviarEmail(
              email.innerHTML,
              "Confirmación compra",
              "Se ha confirmado la compra"
            );
          }
        });
    }
  });
});

function enviarEmail(to, subject, message) {
  let obj = {
    to: to,
    subject: subject,
    message: message,
  };

  let ruta = `/api/notificacion/mail`;
  fetch(ruta, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: { "Content-type": "application/json" },
  })
    .then((result) => result.json())
    .then((data) => {
      if (data.status == "OK") {
        texterrorcart.innerHTML =
          "Gracias por su compra.Su proceso ha sido satisfatorio <br> Se ha enviado una notificación a su correo.";
      }
    });
}

function getCartById(idCart) {
  let url = `/api/carts/${idCart}`;
  let cantItems = 0;
  fetch(url, {
    method: "GET",

    headers: { "Content-type": "application/json" },
  })
    .then((result) => result.json())
    .then((data) => {
      let listproducts = data.products;
      cantItems = listproducts.length;

      const addValues = (total, currentValue) => {
        return total + currentValue.quantity;
      };
      const sum = listproducts.reduce(addValues, 0);

      cantcart.innerHTML = "(" + sum + ")";

      let html = "";
      let total = 0;
      console.log(listproducts);
      listproducts.forEach((item) => {
        let subtotal = item.producto.price * item.quantity;

        total = total + subtotal;
        let btnquitar = `<button
        type="button"
        class='class_quitar'
        id="btnquitar_${item.producto._id}"
        style="border-radius:5px;background-color:red;color:white">
        Quitar
      </button>`;

        let btneditcart = `<button
      type="button"
      class='class_editcart'
      id="btneditcart_${item.producto._id}"
      style="border-radius:5px;background-color:green;color:white">
      Editar
    </button>`;
        let btnupdatecart = `<button
    type="button"
    class='class_updatecart'
    id="btnupdatecart_${item.producto._id}"
    style="border-radius:5px;background-color:green ;color:white" hidden>
    Guardar..
  </button>`;

        let btncanceleditcart = `<button
  type="button"
  class='class_canceleditcart'
  id="btncanceleditcart_${item.producto._id}"
  style="border-radius:5px;background-color:white;color:black" hidden>
  cancelar
</button>`;

        let txtcant = `<input id="txtcantcart_${item.producto._id}" type="number"  value= ${item.quantity} disabled />`;
        let hdstock = `<input type="hidden" id="hdstockcart_${item.producto._id}"   value=${item.producto.stock}  >`;

        html =
          html +
          `<tr id="row_${item.producto._id}" style='vertical-align:middle'>                       
  <td align='center'>${item.producto.code} </td>                  
  <td>${item.producto.description}</td>
  <td>${txtcant}${hdstock}</td>
  <td>${item.producto.price}</td>
  <td>${subtotal}</td>
  <td>${btnquitar}</td>
  <td>${btneditcart}  ${btnupdatecart}  ${btncanceleditcart}</td>
  </tr>`;
      });

      html =
        html +
        `<tr style='vertical-align:middle'>                       
  <td align='center'></td>                  
  <td></td>
  <td></td>
  <td>Total Pagar</td>
  <td>${total}</td>
  </tr>`;

      document.getElementById(`tb_cartbody`).innerHTML = html;
      let btnconfirmar = document.getElementById(`btnconfirmar`);
      btnconfirmar.style.display = "block";
      if (cantItems == 0) btnconfirmar.style.display = "none";
    });
}
function verMsgSwalFire(textmsg, icon) {
  Swal.fire({
    position: "top-end",
    toast: true,
    text: textmsg,
    icon: icon,
    showConfirmButton: false,
    timer: 5000,
  });
}
