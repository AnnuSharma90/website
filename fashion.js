//  let abc = $('#view1').parent().attr('id');
//  console.log(abc);
// let cardid = document.getElementById(abc).children;
// // console.log(cardid);
// let image= cardid[0]
// let view= cardid[2]

// // console.log(view);
// $(view).click(function(){
//   window.open(image.src);
// })


const cart = document.querySelector(".cart");
const cartBox = document.querySelector(".cartBox");
$(cart).click(function () {
  cartBox.classList.add("active");
});
const close = document.querySelector(".close");
$(close).click(function () {
  cartBox.classList.remove("active");
});

// const view = document.getElementsByClassName('view');
// // console.log(view.length);
// for(let i=0; i<view.length; i++){
//   view[i].addEventListener("click", function(e){
//    let image= e.target.parentElement.children[0];
//    window.open(image.src);
//   })
// }

 const view = document.getElementsByClassName("view");

 for (let i = 0; i < view.length; i++) {
   view[i].addEventListener("click", function (e) {
     let id = e.target.id;//1_view
     console.log(id);
     let idNumeric = id.slice(0,1);
     //console.log(idNumeric);
     //let idNumeric = id.substring(0, id.indexOf("_"));
     let image = document.getElementById(idNumeric + "_img");
     window.open(image.src);
    
    
   });
 }

let items = [];
const addtocart = document.getElementsByClassName("fa-cart-plus");
for (let j = 0; j < addtocart.length; j++) {
  addtocart[j].addEventListener("click", function (e) {
    // console.log('product:',e.target.parentElement.children[0].src, 'price:', e.target.parentElement.children[1].textContent);
    let id = e.target.id;
    let idNumeric = id.substring(0, id.indexOf("_"));
    let price = document.getElementById(idNumeric + "_price");

    //adding data to local storage
   if (typeof Storage !== "undefined") {
      let item  = {
        id: id,
        name: "product_" + id,
        price: price.textContent,
        number: 1,
      };
      if (JSON.parse(localStorage.getItem("items")) === null) {
        items.push(item);
        localStorage.setItem("items", JSON.stringify(items));
        window.location.reload();
      } else {
        const localItems = JSON.parse(localStorage.getItem("items"));
        localItems.map((data) => {
          if (item.id == data.id) {
            item.number = data.number + 1;
            window.location.reload();
          } else {
            items.push(data);
          }
        });
        items.push(item);
        localStorage.setItem("items", JSON.stringify(items));
        window.location.reload();
      }
    } else {
      alert("local storage is not working on your browser");
    }
    });


    //adding data to local storage on click of buy//
    const buy = document.getElementsByClassName(".buy");
    for (let k = 0; k < buy.length; k++) {
    buy[k].addEventListener("click", function (event) {
    //console.log('product:',event.target.parentElement.children[0].src, 'price:', event.target.parentElement.children[1].textContent);
    let id = event.target.id;
    let Numeric = id.slice(0,1);
    console.log(Numeric);
    let price = document.getElementById(Numeric + "_price");

    //adding data to local storage
   if (typeof Storage !== "undefined") {
      let item  = {
        id: id,
        name: "product_" + id,
        price: price.textContent,
        number: 1,
      };
      if (JSON.parse(localStorage.getItem("items")) === null) {
        items.push(item);
        localStorage.setItem("items", JSON.stringify(items));
        window.location.reload();
      } else {
        const localItems = JSON.parse(localStorage.getItem("items"));
        localItems.map((data) => {
          if (item.id == data.id) {
            item.number = data.number + 1;
            window.location.reload();
          } else {
            items.push(data);
          }
        });
        items.push(item);
        localStorage.setItem("items", JSON.stringify(items));
        window.location.reload();
      }
    } else {
      alert("local storage is not working on your browser");
    }
    });
  }

  //adding data to cart icon//
  let icon = document.querySelector(".no");
  let number = 0;
  let noItems = JSON.parse(localStorage.getItem("items"));
  if (noItems == null) {
    icon.innerHTML = 0;
  } else {
    noItems.map((data) => {
      number = number + data.number;
    });
    icon.innerHTML = number;
  
    }

        //adding data to cartbox table//
    const table = cartBox.querySelector(".table");    
    function loadTable() {
      let tableData = "";
      let count = 1;
      
      tableData =
        '<tr><th>S.no</th><th>Item</th><th>Price</th><th>Number of item</th><th class="tp">Total price</th><th>Remove Item</th></tr><tr>Total payable amount:</tr>';
      if (JSON.parse(localStorage.getItem("items")) === null) {
        tableData = `<tr><th colspan="5">${'No items found'}</th></tr>`;
      } else {
        JSON.parse(localStorage.getItem("items")).map((data) => {
           total = data.price.slice(1) * data.number;
      
          tableData += `<tr><td> ${count++}</td><td> ${data.name}</td><td>${data.price}</td>
         <td>${data.number}</td><td>${total}</td><td><a id="${count-1}_del" class="delete" onclick=deleteRow(this) >Delete</a>
          </td></tr><tr>${total}</tr>`;

            let sum = [];
           for(let k=1; k<=table.rows.length; k++){
           sum.push(parseInt(table.rows[2*k].cells[4].innerHTML));
            console.log(sum);
           
           }
          //    function result(){
          //      let res =[];
          //     res.push(sum.reduce(function(a,b){ return (a+b);}))             
          //    console.log(res);
          //    return res;
          // } 
       
     
          
    

        });

        table.innerHTML = tableData;
        
        //console.log(table.rows[4].cells[4].innerHTML);

          // function sum(){
          //       let sumVal = 0;
          //       for(let k=2; k <= table.rows.length; k++){
          //         sumVal = parseInt(table.rows[k*2].cells[4].innerHTML);
          //       }
          //       return sumVal; 

          //     }
                     

      }              

    }
    
    loadTable();
    
    function deleteRow(e){
       if(e.id){
        let item  = {
          id: id,
          name: "product_" + id,
          price: price.textContent,
          number: 1,
        };
        const localItems = JSON.parse(localStorage.getItem("items"));
        localItems.map((data) => {
          if (item.id == data.id) {
            item.number = data.number - 1;
            window.location.reload();
          } else {
            items.pop(data);
          }
        });
        items.pop(item);
        localStorage.setItem("items", JSON.stringify(items));
        window.location.reload();
         
       }
      
    }

  
  };

