//Get Total
// create product
//  save local
//  clear inputs
// read
//count
//delete
// update
//search
//clean

// حبدأ اعرف الدنيا هنا اومال حشتغل ازاي
let title = document.getElementById ('title');
let price = document.getElementById ('price');
let taxes = document.getElementById ('taxes');
let ads = document.getElementById ('ads');
let discount = document.getElementById ('discount');
let total = document.getElementById ('total');
let count = document.getElementById ('count');
let category = document.getElementById ('category');
let submit = document.getElementById ('submit');
console.log(title, price, taxes,ads, discount, total, category, submit);

let dataPro =[];
// حعمل الشروط
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
} else {
     dataPro=[];} 
    //  المخزن 

// حعمل حسبة الاسعار بالJS
// + عشان ميبقوش string 
// innerHTML عشان تبقي ظاهرة ككتابة 
// هنا حفرق بين التجديد والانشاء
let mood = 'create';
let PlanB 
// متغيرات الupdate 




function getTotal(){
   if(price.value!="" ){
    let result = (+price.value + +taxes.value + +ads.value - +discount.value  )
    total.innerHTML = result ; 
    total.style.background = 'green ';

   }else{
    total.style.background = '#f00';
    total.innerHTML = 'الرجاء ادخال السعر'
   }
}

//   تحفظ بيانات الداتا حهكل obkect 

submit.onclick = function(){
    let newPro = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value.toLowerCase(), 
        // عشان البجث 
    }

    // التحقق من اكتمال البيانات
    if (title.value !== '' && price.value !== '' && category.value !== '' && newPro.count < 100) {
        // update 
        if (mood === 'create') {
            // count
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[PlanB] = newPro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        
        // حفظ البيانات في localStorage
        localStorage.setItem('product', JSON.stringify(dataPro));

        // عرض البيانات المحدثة
        showData();
        
        // تنظيف الحقول
        cleardata();
    } else {
        // إذا لم تكن جميع الحقول المطلوبة مكتملة، عرض رسالة للمستخدم
        alert('Please fill all required fields.');
    }
}


function cleardata(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    category.value = '';
    count.value = '';
// عملت دي عشان تمسح البيانات لما اكتبها وباعتها للمخزن
}

// read حعملها عشان تقرا البيانات تحت
function showData(){
    // حناجي علي get total عشان اللون
    getTotal()

    let tabale ='';
    for (let i = 0; i < dataPro.length; i++) {
        tabale += `
        <tr class="" >
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td class="outputs-res"><button id="update" onclick="updateData(${i})" >Update <i class="fa-solid fa-wrench"></i> </button></td>
        <td class="outputs-res"><button id="delete" onclick="deleteData(${i})">Delete <i class="fa-solid fa-trash-can"></i></button></td>
    </tr>
        `;
    }
    cleardata(); // يجب وضع نقطة منتهى للأمر

    document.getElementById('tblc').innerHTML = tabale;
    let btnDelete = document.getElementById('deletAll');
    if (dataPro.length > 0) {
        btnDelete.innerHTML=`
        <button class="btn btn-danger w-100 my-4  deel" onclick="deletAll()" >Delete All  ${dataPro.length} <i class="fa-solid fa-trash-can"></i> </button>`;
    } else {
        btnDelete.innerHTML=``;
    }
}
showData();
// delete item 

function deleteData(i) {

    dataPro.splice(i, 1);
localStorage.production = JSON.stringify(dataPro);
showData(); }

// زررار مسح لكل شئ
 function deletAll() {
  
    localStorage.clear();
    dataPro.splice(0);
    showData(); }


    // Update
    function updateData(i){
        title.value = dataPro[i].title;
        price.value = dataPro[i].price;
        taxes.value = dataPro[i].taxes;
        ads.value = dataPro[i].ads;
        discount.value = dataPro[i].discount;
        // total.innerHTML = dataPro[i].total;
        getTotal();  
        category.value = dataPro[i].category;
        count.style.display = 'none';
        submit.innerHTML = 'update ' ;
        mood = 'update';
        PlanB = i ;
        scroll({
            top: 0,
            behavior: 'smooth',


        });
        
    }

    // search 
    let searchMood = 'title';

    function GetsearchMood(id){
        // console.log(id);
        let search = document.getElementById('search');
        if(id == 'searchTitle'){
            searchMood = 'title';
            
        }else {
            searchMood = 'category';
           
        }
        search.placeholder = 'Search by ' +searchMood;
        search.focus();
        search.value='' ;
        showData() ; 

        // console.log(searchMood);
    }

    function searchData(value){
        // console.log(value);
        let tabale = '' ;
        for(let i = 0; i <dataPro.length ; i++){
        if(searchMood == 'title'){
        
        if(dataPro[i].title.includes(value.toLowerCase())){
            // console.log(i);
            tabale += `
    <tr class="" >
    <td>${i+1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td class="outputs-res"><button id="update" onclick="updateData(${i})" >Update</button></td>
    <td class="outputs-res"><button id="delete" onclick="deleteData(${i})">Delete</button></td>
</tr>
    `;}

        

         
    } else 
        if(dataPro[i].category.includes(value.toLowerCase())){
            // console.log(i);
            tabale += `
    <tr class="" >
    <td>${i+1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td class="outputs-res"><button id="update" onclick="updateData(${i})" >Update</button></td>
    <td class="outputs-res"><button id="delete" onclick="deleteData(${i})">Delete</button></td>
</tr>
    `;}

         
    }
    document.getElementById('tblc').innerHTML = tabale;
}
       
        

    // clean DaTa






    // submit.onclick = function(){
    //     let newPro = {
    //         title : title.value.toLowerCase(),
    //         price : price.value,
    //         taxes : taxes.value,
    //         ads : ads.value,
    //         discount : discount.value,
    //         total : total.innerHTML,
    //         count : count.value,
    //         category : category.value.toLowerCase(), 
    //         // عشان البجث 
    //     }
    //  if(title.value != '' && price.value != '' && category.value != '' && newpro.count < 100){
    //         // update 
    //         if(mood === 'create'){
    //             // count
    //         if (newPro.count > 1 ){
    //             for (let i = 0; i < newPro.count; i++){
    //                 dataPro.push(newPro);
    //             }
    //         } else{
    //             dataPro.push(newPro);
    //         }
    //     } else {
    //         dataPro [ PlanB  ] = newPro;
    //         mood = 'create';
    //         submit.innerHTML = 'Create' ;
    //         count.style.display = 'block';
    //     } 
    //     cleardata();
    //     }
        
        
    //     // لكي يتم حفظها وربطها بLS
    //     // dataPro.push(newPro);
    //     localStorage.setItem('product', JSON.stringify(dataPro));   
    //      console.log(dataPro);
        
    //     showData();
    //     // send it here 
    // }



















    // function showData(){
//     let tabale ='';
//     for (let i = 0; i < dataPro.length; i++) {
//         tabale += `
//         <tr class="" >
//         <td>${i+1}</td>
//         <td>${dataPro[i].title}</td>
//         <td>${dataPro[i].price}</td>
//         <td>${dataPro[i].taxes}</td>
//         <td>${dataPro[i].ads}</td>
//         <td>${dataPro[i].discount}</td>
//         <td>${dataPro[i].total}</td>
//         <td>${dataPro[i].category}</td>
//         <td class="outputs-res"><button  id="update">Update</button></td>
//         <td class="outputs-res"><button  id="delete" onclick="deleteData(${i})>Delete</button></td>
//     </tr>
//         `
        
//     }
//     cleardata() 


//     document.getElementById('tbody').innerHTML =  tabale ;
// }









