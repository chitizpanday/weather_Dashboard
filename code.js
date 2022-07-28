

//implementing setInterval function which can be called in a set interval, here, we are calling the function every 1 second (1000)
var listOfCities = [];
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
  document.getElementById("curCity").innerHTML = newName.value

  addCityToList(newName.value)

  getWeatherData(newName.value);

  var newName = document.getElementById("searchCity").value;
  listOfCities.push(newName);
  var jsonnewName = JSON.stringify(listOfCities);
  localStorage.setItem("row1", jsonnewName);
}


function addCityToList(city) {
  var cityList = document.getElementById("cities");
  if (city != "") {
    var makeLi = document.createElement("li");
    makeLi.setAttribute("class", "recent-city")
    makeLi.appendChild(document.createTextNode(city));
    cityList.appendChild(makeLi);
    makeLi.onclick = function() {
      getWeatherData(this.innerHTML);
    }
    // newName.value="";
  }
  //document.getElementById("CITY").innerHTML = cityList.value
}


function loadData() {

  if (localStorage.getItem("row1") !== null) {
    var listCities = JSON.parse(localStorage.getItem("row1")); // [2, 3, 45]

    for (var i = 0; i < listCities.length; i++) {
      var currentCity = listCities[i];
      addCityToList(currentCity);

    }
  }
   
}

loadData();



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

  var onecallurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.city.coord.lat}&lon=${data.city.coord.lon}&exclude={part}&units=imperial&appid=${APIkey}`
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
  <div>${data.list[0].main.humidity} %</div>
</div>
<div class="weatherItems">
  <div>Temperature</div>
  <div>${data.list[0].main.temp} ℉</div>
</div>
<div class="weatherItems">
  <div>Wind Speed</div>
  <div>${data.list[0].wind.speed} mph</div>
</div>
<div class="weatherItems">
  <div>UV-Index</div>
  <div id="UV">${fivedaydata.current.uvi}</div>`;


      let numberOfDays = 5;
      let futureForecastHtml = "";
      for (var i = 0; i < numberOfDays; i++) {
        //console.log(fivedaydata.daily[i].weather[0].icon);
        futureForecastHtml += `
    <div class="col-sm-2 future-forecast">
    <div class="day">${new Date().addDays(i + 1).toLocaleDateString()}</div>
    <img src=https://openweathermap.org/img/w/${fivedaydata.daily[i].weather[0].icon}.png alt="weather icon" class="wIcon">
    <p>Temp: ${fivedaydata.daily[i].temp.day} ℉</p>
    <p>Wind: ${fivedaydata.daily[i].wind_speed} mph</p>
    <p>Humidity: ${fivedaydata.daily[i].humidity}%</p>
  </div>`
      }
      document.getElementById("lowdash").innerHTML =
        `<h4> Future Forcast</h4>
  ${futureForecastHtml}`
      changeColor()
    })
}
// changeColor()
function changeColor() {

  var uvIndex = document.getElementById("UV");
  if (uvIndex.innerText <= 2) {
    colorcode = "#00FF00";
  }
  else if ((uvIndex.innerText > 2) && (uvIndex.value <= 5)) {
    colorcode = "#FFA500";
  }
  else if ((uvIndex.innerText > 5) && (uvIndex.value <= 10)) {
    colorcode = "##ff0000";
  }
  else (colorcode = "##000000");
  uvIndex.style.color = colorcode;
}


