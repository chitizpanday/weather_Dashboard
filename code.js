

//implementing setInterval function which can be called in a set interval, here, we are calling the function every 1 second (1000)

function currentTime() {
    var date = new Date();
    var currTime = date.toLocaleTimeString();
    document.getElementById("time").innerHTML = currTime;
}
setInterval(currentTime, 1000);

Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}


function currdate() {
    var today = new Date();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    var date = today.getDate();
    var currentDate = `${month}-${date}-${year}`;
    document.getElementById("date").innerHTML = currentDate;
}
currdate()

//reflect the searched city name in the today's weather tab and populate the history of the searched cities

var newName;
function getInfo() {
    newName = document.getElementById("searchCity");
    document.getElementById("CITY").innerHTML = newName.value
    var newName = document.getElementById("searchCity");
    var cityList = document.getElementById("cities");
    if (newName.value != "") {
        var makeLi = document.createElement("li");
        makeLi.appendChild(document.createTextNode(newName.value));
        cityList.appendChild(makeLi);
        // newName.value="";
    }
    getWeatherData(newName.value);
}



//     var  newName = document.getElementById("searchCity").value;
//     var jsonnewName=JSON.stringify(newName);
//     localStorage.setItem("row1", jsonnewName);
//  }

//    if (localStorage.getItem("label2")!==null)  
// {document.getElementById ("label2").innerHTML =JSON.parse(localStorage.getItem("label2"))}




var APIkey = '26703a1ad097cf02cf4d6f03136ef899'


//get weather details from API using javascript promise/ fetch method

function getWeatherData(newName) {
    console.log(newName);
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${newName}&units=imperial&appid=${APIkey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
           // console.log(data);

            showWeatherData(data)
        })
}


function showWeatherData(data) {
    console.log(data.list[0].main.temp);
   // var { humidity, temp, Wind, uv_inex } = data.list;

    var onecallurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.city.coord.lat}&lon=${data.city.coord.lon}&exclude={part}&appid=${APIkey}`
    fetch(onecallurl)
        .then(function (response) {
            return response.json();
        })
        .then(function (fivedaydata) {
            console.log(fivedaydata);

document.getElementById("currentWeatherItems").innerHTML =
`<div class="others" id="currentWeatherItems">
<div class="weatherItems">
  <div>Humidity</div>
  <div>${data.list[0].main.humidity}</div>
</div>
<div class="weatherItems">
  <div>Temperature</div>
  <div>${data.list[0].main.temp}</div>
</div>
<div class="weatherItems">
  <div>Wind Speed</div>
  <div>${data.list[0].wind.speed}</div>
</div>
<div class="weatherItems">
  <div>UV-Index</div>
  <div id="UV">${fivedaydata.current.uvi}</div>`;

  
  let numberOfDays = 5;
  let futureForecastHtml = "";
  for(var i=0; i<numberOfDays; i++){
    futureForecastHtml += `
    <div class="col-sm-2 future-forecast">
    <div class="day">${new Date().addDays(i + 1).toLocaleDateString()}</div>
    <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" class="wIcon">
    <p>Temp: 73.72</p>
    <p>Wind: ${fivedaydata.daily[i].wind_speed} MPH</p>
    <p>Humidity: ${fivedaydata.daily[i].humidity}%</p>
  </div>`
  }
  document.getElementById("lowdash").innerHTML= 
  `<h4> Future Forcast</h4>
  ${futureForecastHtml}`
  changeColor()
        })
}
// changeColor()
function changeColor(){

  var uvIndex = document.getElementById("UV");
  if (uvIndex<=2){
      colorcode="#00ff00";
  }
  else if((uvIndex>2)&&(uvIndex.value<=5)){
      colorcode="#ffa500";
  }
  else if((uvIndex>5)&&(uvIndex.value<=10)){
      colorcode="#7f00ff";
  }
  else(colorcode = "#7f00ff");
  uvIndex.style.color = colorcode;
}


