

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

//reflect the searched city name in the today's weather tab and populate the history of the searched cities


function getInfo(){
var newName = document.getElementById("searchCity");
document.getElementById("CITY").innerHTML=newName.value
var newName = document.getElementById("searchCity");
var cityList= document.getElementById("cities");
if(newName.value!=""){
var makeLi=document.createElement("li");
makeLi.appendChild(document.createTextNode(newName.value));
cityList.appendChild(makeLi);
newName.value="";
}
}



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

   var APIkey = '26703a1ad097cf02cf4d6f03136ef899'


//get weather details from API using javascript promise/ fetch method
getWeatherData()
function getWeatherData(){
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=denver&units=imperial&appid=${APIkey}`)
.then(function(response){
    return response.json();
})
.then(function(data){
console.log(data);

showWeatherData(data)
})
}
//it could also be written in a fat arrow as://  .then(response=>response.json())
//  .then(data=>console.log (data))

 function showWeatherData(data){
var{humidity, temp, Wind, uv_inex} = data.current;
document.getElementById("currentWeatherItems").innerHTML=
` <div class="others" id="currentWeatherItems">
<div class="weatherItems">
  <div>Humidity</div>
  <div></div>
</div>
<div class="weatherItems">
  <div>Temperature</div>
  <div>(data.list[].main.temp)</div>
</div>
<div class="weatherItems">
  <div>Wind Speed</div>
  <div>10 mph</div>
</div>
<div class="weatherItems">
  <div>UV-Index</div>
  <div>21.2</div>`;
 }
 
