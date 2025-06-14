let title = document.getElementById("title");
console.log("sf", title);
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
// inputs modes
let mode  = "create";
// search modes 
let searchMood = "title";
let updatenum = 0 ;
console.log(title,price,ads,discount,total , count , submit, category , taxes);
window.onload = function(){ 
    if(localStorage.product != '' ||localStorage.product != undefined ){
    showData(); 
}else{
    localStorage.product = JSON.stringify([])
}
    
}
 
// __________________________________________________
// get total
function get_total(){ 
    console.log(1,);
    if(price.value != '' ){ 

        let result  = (+price.value+ +taxes.value) + +ads.value -  +discount.value;
        total.style.background = "#0f06";
        total.innerText  = result ;

        
    }
    else{ 
          total.style.background = "#a00d02";
          total.innerText = 0 ;
    }
    
}



// create product
let dataPro;
if(localStorage.product != '' || localStorage.product == undefined){ 
     dataPro =JSON.parse( localStorage.product);
}
else{
 dataPro = [];
 console.log("hello")
}

submit.onclick = _=>{ 
   
    let newpro = { 
        title :title.value , 
        price :price.value , 
        taxes :taxes.value == '' ?  0:taxes.value  , 
        ads: ads.value == '' ?  0: ads.value ,
        discount : discount.value == '' ?  0: discount.value  , 
        total : total.innerHTML,
        category : category.value ,
        count : count.value == '' ?  1: count.value  ,
    } ; 
    // save local storage

    if(title.value.trim() != '' && price.value.trim()!= ''&& category.value.trim() != '' && count.value  <= 100){
    if(mode == "create"){
        
        for(let i = 0 ; i < newpro.count ; i++) dataPro.push(newpro);

    localStorage.setItem("product" , JSON.stringify(dataPro));
    console.log(newpro);

    clearinputs();
    showData();}
    
    else{ 
    dataPro[updatenum].title = title.value ;
    dataPro[updatenum].ads = ads.value ;
    dataPro[updatenum].discount= discount.value ;
    dataPro[updatenum].total= total.value ;
    dataPro[updatenum].taxes= taxes.value  ;
    dataPro[updatenum].taxes= taxes.value ;
    dataPro[updatenum].price=  price.value ;
    dataPro[updatenum].category= category.value ;
    clearinputs();
    localStorage.setItem("product" , JSON.stringify(dataPro));
        showData();
        submit.innerHTML = "Create";
        mode="create";
            count.style.display= "block";
    }
}

    get_total();
}




// clear inputs 
function clearinputs(){ 
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';

}

// read 
function showData(){ 
    let table = document.querySelector("#tbody");
    table.innerHTML = '';
    let tr =  document.createElement("tr");
    let td = document.createElement("td"); 
    let len;
    console.log(dataPro);
    for(let i = 0 ; i < dataPro.length ; i++){ 
       
            
      table.innerHTML +=   `<tr>
<td>${i+1}</td>
<td>${dataPro[i].title}</td>
<td>${dataPro[i].price}</td>
<td>${dataPro[i].taxes}</td>
<td>${dataPro[i].ads}</td>
<td>${dataPro[i].discount}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category}</td>
<td><button onclick="updateData(${i})" id="update" >update</button></td>
<td><button onclick="deleteData(${i})" id="delete">delete</button></td>
</tr> ` ;

     
     
    }
    let btnDelete = document.querySelector("#deleteAll");
    if(dataPro.length > 0){ 
        btnDelete.innerHTML = `<button> DELETE ALL(${dataPro.length})`; 

       
    

    }else { 
        btnDelete.innerHTML= "";
    }
    

}

// count
// delete 
function deleteData(i){ 
 console.log(i);
 dataPro.splice(i,1);   
 console.log(dataPro);
 localStorage.setItem("product",JSON.stringify(dataPro));
 showData();    
}

// delete all data 
function deleteall(){ 
    dataPro = [];
    localStorage.product = [ ];
    showData();
}


// update 
function updateData(i){ 
    console.log(i);
    title.value = dataPro[i].title;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    total.value = dataPro[i].total;
    taxes.value = dataPro[i].taxes;
    taxes.value = dataPro[i].taxes;
    price.value = dataPro[i].price;
    category.value = dataPro[i].category;
    get_total();
    count.style.display= "none";
    submit.innerHTML = "Update";
    mode = "update";
    updatenum= i;
    window.scrollTo({top:0 , left:0 , behavior:"smooth"});
}




// search
function getSearchMood(id){ 
    let search = document.getElementById("search");
    console.log(id)
    if(id == "searchTitle"){ 
        searchMood = "title"; 
        
   
         searchData(search.value);
    }
    else{
        searchMood = "category";
        searchData(search.value);
    } 
    search.placeholder= `Search By ${searchMood}`;

console.log(searchMood);
search.focus();

}
function searchData(value){ 

    if(value.trim() == ''){
        showData();

     }
//    we will make new table for made the results 
    let table = '';
        for(let i = 0 ; i< dataPro.length  ; i ++){ 
            if(dataPro[i][searchMood].toLowerCase().trim().includes(value.toLowerCase().trim())){

table+=   `<tr>
<td>${i+1}</td>
<td>${dataPro[i].title}</td>
<td>${dataPro[i].price}</td>
<td>${dataPro[i].taxes}</td>
<td>${dataPro[i].ads}</td>
<td>${dataPro[i].discount}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category}</td>
<td><button onclick="updateData(${i})" id="update" >update</button></td>
<td><button onclick="deleteData(${i})" id="delete">delete</button></td>
</tr> ` ;


                
                console.log(i);
            
            }


        }

        document.querySelector("#tbody").innerHTML = table ; 

   
}

// clean data no input was empty ka--da
// console.log(document.querySelectorAll(".price > *"))


// get total 
// if you make +d before the var the str in var will configure to int
// use it bec it make +'' =0 