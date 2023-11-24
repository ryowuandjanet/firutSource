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

function renderTable() {
  var order = firebase.database().ref("order/");
  order.on("child_added", function (data) {
    var orderValue = data.val();
    document.getElementById("table").innerHTML += `
    <tr>
      <td>${orderValue.id}</td>
      <td>${orderValue.order}</td>
      <td>${orderValue.total}</td>
    </tr>
  `;
  });
}
