function getInfo(){
    //var newName is going to collect data from the input field
    var newName = document.getElementById("searchCity");
    var cityName = document.getElementById("city").innerHTML=newName.value

}
//get weather details from API using javascript promise/ fetch method

fetch("https://api.openweathermap.org/data/2.5/forecast?q=texas&appid=e3e7f409d7554da4b1757864ff62f226")
// .then(response=>response.json())
// .than(data=>{})

.then(function(response){
    return response.json();
})
.then(function(result){
console.log(result);
});