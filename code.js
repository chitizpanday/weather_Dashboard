//var TIME= document.getElementById("time");
//var DATE= document.getElementById("date");
var CURRENTWEATHERITEMS =document.getElementById("currentWeatherItems");




//implementing setInterval function which can be called in a set interval, here, we are calling the function every 1 second (1000)

function currentTime(){
    var date=new Date ();
    var currTime=date.toLocaleTimeString();
    document.getElementById("time").innerHTML=currTime;
}
setInterval(currentTime,1000);



function currdate(){
    var today= new Date();
   var month = today.getMonth()+1;
   var year = today.getFullYear();
   var date = today.getDate();
   var currentDate= `${month}-${date}-${year}`;
   document.getElementById("date").innerHTML=currentDate;
}
currdate()
function getInfo(){
    //var newName is going to collect data from the input field
    var newName = document.getElementById("searchCity");
    document.getElementById("CITY").innerHTML=newName.value
    document.getElementById("row1").innerHTML=newName.value
  var cityName = document.getElementById("city").innerHTML=newName.value
}
//  function getInfo(){
//     var  newName = document.getElementById("searchCity").value;
//     var jsonnewName=JSON.stringify(newName);
//     localStorage.setItem("row1", jsonnewName);
//  }

//    if (localStorage.getItem("label2")!==null)  
// {document.getElementById ("label2").innerHTML =JSON.parse(localStorage.getItem("label2"))}


// function saveData2(){
// var text2=document.getElementById("label2").value;
// var jsontext2 = JSON.stringify(text2);
// localStorage.setItem ("label2", jsontext2);
// }

   var APIkey = 'e3e7f409d7554da4b1757864ff62f226'
//get weather details from API using javascript promise/ fetch method
getData()
function getData(){
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=dallas&appid=${ APIkey}`)
 .then(response=>response.json())
 .then(data=>{
    console.log (data)
})
}



// .then(function(response){
//     return response.json();
// })
// .then(function(result){
// console.log(result);
// });