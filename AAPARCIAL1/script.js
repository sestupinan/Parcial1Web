let promesa = new Promise((resolve,reject) => {
    let req = new XMLHttpRequest();
    let url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
    req.open('GET', url);
    req.onload = function(){
    if(req.status==200)
    {
        //Existoso
        console.log("Success con la petición")
        resolve(req.response);
    }
    else
    {
        //Error
        console.log("Error con la petición")
        reject('Error');
    }
    };
    req.send();

});

promesa.then((data) =>{
    let div = document.getElementById("food");
    let datos = JSON.parse(data);
    for (let index = 0; index < datos.length; index++) {
        var tr = document.createElement("div");
        tr.className="item";
        tr.innerHTML= "<img class='card-img-top' src='" + datos[index].last_lane + "</td>"+
        "<td>" + datos[index].first_name + "</td>"+
        "<td>" + datos[index].email + "</td>"+
        "<td><img src='" + datos[index].photo + "'></td>"+
        "<td> <button type='button' class='btn btn-danger' id='deleteR' value='Delete Row' onclick='SomeDeleteRowFunction(this);'>Borrar row</button></td>"
        ;
        div.appendChild(tr);
    }
}
);

function SomeDeleteRowFunction() {
    // event.target will be the input element.
    var td = event.target.parentNode; 
    var tr = td.parentNode; // the row to be removed
    tr.parentNode.removeChild(tr);
}

function SomeInsertRowFunction(){
    const lastl = document.getElementById("lastl");
    const firstn = document.getElementById("firstn");
    const email = document.getElementById("email");
    const photo = document.getElementById("photo");
    let tableB = document.getElementById("tableB");
    var tr = document.createElement("tr");
        tr.className="item";
        tr.innerHTML= "<td>" + lastl.value + "</td>"+
        "<td>" + firstn.value + "</td>"+
        "<td>" + email.value + "</td>"+
        "<td><img src='" + photo.value + "'></td>"+
        "<td> <button type='button' class='btn btn-danger' id='deleteR' value='Delete Row' onclick='SomeDeleteRowFunction(this);'>Borrar row</button></td>"
        ;
    tableB.appendChild(tr);
    lastl.value="";
    firstn.value="";
    email.value="";
    photo.value="";

}

function SomeDeleteTableFunction(){
    let tableB = document.getElementById("tableB");
    tableB.parentNode.removeChild(tableB);
}


let tablid = "#tabla";
let headers = document.querySelectorAll("th");
console.log(headers);
// Sort the table element when clicking on the table headers
headers.forEach(function(element, i) {
  element.addEventListener("click", function() {
    console.log("entre");

    w3.sortHTML(tablid, ".item", "td:nth-child(" + (i + 1) + ")");
  });
});