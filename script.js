let menu;
class Item {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}

let order = [];
let promesa = new Promise((resolve, reject) => {
  let req = new XMLHttpRequest();
  let url =
    "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
  req.open("GET", url);
  req.onload = function () {
    if (req.status == 200) {
      //Existoso
      console.log("Success con la petición");
      resolve(req.response);
    } else {
      //Error
      console.log("Error con la petición");
      reject("Error");
    }
  };
  req.send();
});

promesa.then((data) => {
  let div = document.getElementById("food");
  let aux = document.createElement("div");
  aux.id = "aux";
  aux.className = "row";
  div.appendChild(aux);
  let datos = JSON.parse(data);
  menu = datos;
  let ini = datos[0];
  let products = ini.products;
  for (let index = 0; index < products.length; index++) {
    let tr = document.createElement("div");
    tr.className = "card col-2.9";
    tr.innerHTML =
      "<img class='card-img-top' src='" +
      products[index].image +
      "' alt='Card image cap' height=150px width=150px>" +
      "<div class='card-body'><h5 class='card-title'>" +
      products[index].name +
      "</h5>" +
      "<p class='card-text'>" +
      products[index].description +
      "</p>" +
      "<p class='card-text'>$" +
      products[index].price +
      "</p>" +
      "    <a class='btn btn-dark' onclick='addOrden(\"" +
      products[index].name +
      "\", \"" +
      products[index].price +
      "\");'>Add to cart</a>";
    ("</div></div>");
    aux.appendChild(tr);
  }
});

function showTipo(ptipo) {
  let titulo = document.getElementById("categ");
  clearOrder();
  clearFoods();
  let aux = document.getElementById("aux");
  let ini = menu[ptipo];
  titulo.innerText = ini.name;
  let products = ini.products;
  for (let index = 0; index < products.length; index++) {
    let tr = document.createElement("div");
    tr.className = "card col-2.9";
    tr.innerHTML =
      "<img class='card-img-top' src='" +
      products[index].image +
      "' alt='Card image cap' height=150px width=150px>" +
      "<div class='card-body'><h5 class='card-title'>" +
      products[index].name +
      "</h5>" +
      "<p class='card-text'>" +
      products[index].description +
      "</p>" +
      "<p class='card-text'>$" +
      products[index].price +
      "</p>" +
      "    <a onclick='addOrden(\"" +
      products[index].name +
      "\", \"" +
      products[index].price +
      "\");' class='btn btn-dark'>Add to cart</a>";
    ("</div></div>");
    aux.appendChild(tr);
  }
}

function clearFoods() {
  let div = document.getElementById("aux");
  div.parentNode.removeChild(div);
  div = document.getElementById("food");
  let aux = document.createElement("div");
  aux.id = "aux";
  aux.className = "row";
  div.appendChild(aux);
}

function clearOrder() {
  let div = document.getElementById("aux2");
  div.parentNode.removeChild(div);
  div = document.getElementById("order");
  let aux = document.createElement("div");
  aux.id = "aux2";
  div.appendChild(aux);
}

function showOrder() {
  let titulo = document.getElementById("categ");
  titulo.innerText = "Order detail";
  clearFoods();
  clearOrder();
  let div = document.getElementById("order");
  let aux2 = document.getElementById("aux2");
  let table = document.createElement("table");
  table.className = "table table-striped table-hover";
  let tblhead = document.createElement("thead");
  let tr = document.createElement("tr");
  for (let index = 0; index < 5; index++) {
    let th = document.createElement("th");
    if (index === 0) {
      th.innerText = "Item";
    } else if (index === 1) {
      th.innerText = "Qty";
    } else if (index === 2) {
      th.innerText = "Description";
    } else if (index === 3) {
      th.innerText = "Unit Price";
    } else if (index === 4) {
      th.innerText = "Amount";
    }
    tr.appendChild(th);
  }
  let total = 0;
  tblhead.appendChild(tr);
  table.appendChild(tblhead);
  let tblbody = document.createElement("tbody");
  for (let index = 0; index < order.length; index++) {
    total = total + order[index].price * order[index].quantity;
    tr = document.createElement("tr");
    tr.className = "item";
    tr.innerHTML =
      "<td>" +
      (index + 1) +
      "</td>" +
      "<td>" +
      order[index].quantity +
      "</td>" +
      "<td>" +
      order[index].name +
      "</td>" +
      "<td>" +
      order[index].price +
      "</td>" +
      "<td>" +
      order[index].price * order[index].quantity +
      "</td>";
    tblbody.appendChild(tr);
  }
  table.appendChild(tblbody);
  let div2 = document.createElement("div");
  div2.className = "row";
  let divTot = document.createElement("div");
  divTot.className = "col-9";
  divTot.innerText = "Total: $" + total;
  let divOptions = document.createElement("div");
  divOptions.className = "col-3";
  divOptions.innerHTML =
    "<button type='button' class='btn btn-danger' id='deleteOrder' value='deleteOrder' data-toggle='modal' data-target='#cancelModal'>Cancel</button>" +
    "<button type='button' class='btn btn-success' id='confirmOrder' value='confirmOrder' onclick='confirmOrder();'>Confirm Order</button>";
  div2.appendChild(divTot);
  div2.appendChild(divOptions);
  aux2.appendChild(table);
  aux2.appendChild(div2);
  div.appendChild(aux2);
}

function deleteOrder() {
  order = [];
  let numitems = document.getElementById("numitems");
  numitems.innerText = "0 items";
  clearOrder();
  showOrder();
}

function confirmOrder() {
  console.log(order);
}

function addOrden(name, price) {
  let numitems = document.getElementById("numitems");
  numnuevo = parseInt(numitems.innerText);
  numnuevo = numnuevo + 1;
  let nuevo = true;
  for (let index = 0; index < order.length; index++) {
    if (order[index].name === name) {
      nuevo = false;
      order[index].quantity = order[index].quantity + 1;
    }
  }
  if (nuevo === true) {
    let inew = new Item(name, price, 1);
    order.push(inew);
  }
  numitems.innerText = numnuevo + " items";
}


