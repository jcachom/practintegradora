const form = document.getElementById("loginform");
const texterror = document.getElementById("texterror");

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));
  fetch("/api/sessionslocalpassport/login", {
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
        texterror.innerHTML = json.message;
      }
    });
});
