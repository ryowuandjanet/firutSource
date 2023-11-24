// Initialize Firebase
var config = {
  apiKey: "AIzaSyAfQmKIAuj0M2vFd3Uc105dIPfdIubRsmk",
  authDomain: "curd-ebf6b.firebaseapp.com",
  databaseURL: "https://curd-ebf6b.firebaseio.com",
  projectId: "curd-ebf6b",
  storageBucket: "curd-ebf6b.appspot.com",
  messagingSenderId: "208290440336",
};
firebase.initializeApp(config);

var products = JSON.parse(localStorage.getItem("cart"));
var cartItems = [];
var cart_n = document.getElementById("cart_n");
var table = document.getElementById("table");
var total = 0;
function tableHTML(i) {
  return `
    <tr>
    <th scope="row">${i + 1}</th>
    <td><img style="width:90px;" src="${products[i].url}" ></td>
    <td>${products[i].name}</td>
    <td>1</td>
    <td>${products[i].price}</td>
    </tr>
  `;
}

function buy() {
  var d = new Date();
  var t = d.getTime();
  var counter = t;
  counter += 1;
  let db = firebase.database().ref("order/" + counter);
  let itemdb = {
    id: counter,
    order: counter - 895,
    total: total,
  };
  db.set(itemdb);
  swal({
    position: "center",
    type: "success",
    title: "Purchase made successfully",
    text: `Your purchase order is: ${itemdb.order}`,
    showConfirmButton: true,
    timer: 50000,
  });
  clean();
}

function clean() {
  localStorage.clear();
  for (let index = 0; index < products.length; index++) {
    table.innerHTML += tableHTML(index);
    total = total + parseInt(products[index].price);
  }
  total = 0;
  table.innerHTML = `
    <tr>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
    </tr>
  `;
  cart_n.innerHTML = "";
  document.getElementById("btnBuy").style.display = "none";
  document.getElementById("btnClean").style.display = "none";
}

function render() {
  for (let index = 0; index < products.length; index++) {
    table.innerHTML += tableHTML(index);
    total = total + parseInt(products[index].price);
  }
  table.innerHTML += `
    <tr>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col">Total: $${total}.00</th> 
    </tr>
    <tr>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col">
      <button id="btnClean" class="btn text-white btn-warning" onclick="clean()">Clean Shopping Cart</button>
    </th>
    <th scope="col"><button id="btnBuy" class="btn btn-success" onclick="buy()">buy</button></th> 
    </tr>
  `;
  products = JSON.parse(localStorage.getItem("cart"));
  cart_n.innerHTML = `[${products.length}]`;
}
