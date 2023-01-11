
let apiKey = `bce14d8aab9e4feb23181748e66debf1`
let url = `https://api.themoviedb.org/3/trending/movie/week?api_key=bce14d8aab9e4feb23181748e66debf1`
let movieArray = [ ]

function trendingMoives(){
  let movieArray = []
  //  for (var i = 0; i<20; i++) {
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=bce14d8aab9e4feb23181748e66debf1`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);
            data = data.results
            let allMovies = [ ]
            for (var i = 0; i < data.length; i ++){
              let movieData = {}
              movieData.title = data[i].original_title
              movieData.poster = "https://image.tmdb.org/t/p/w500" + data[i].poster_path 
              allMovies.push(movieData)
            }
            console.log(allMovies)
            return data
         })
};

trendingMoives();




//WEATHER RELATED JS//

// APIkey for openweathermap
var APIkey = '2e64565d10dd2c4f4e922c655105f38b'

// global variables
let city;
let cities;

//load most recently searched city from local storage
const loadRecentCity = () => {let lastSearch = localStorage.getItem("mostRecent");
  if (lastSearch) {city = lastSearch;search();} else {city = "New York";search();}}
  
loadRecentCity()
  
// load recently searched cities from local storage
const loadRecentCities = () => {let recentCities = JSON.parse(localStorage.getItem("cities"));
  if (recentCities) {cities = recentCities;} else {cities = [];}}
  
loadRecentCities()
  
// save searched cities to local storage
const saveToLocalStorage = () => {localStorage.setItem("mostRecent", city); 
  cities.push(city); localStorage.setItem("cities", JSON.stringify(cities));}
  
// retrieve user input for city name
const getCity = () => {city = $("#city-input").val();
  if (city && cities.includes(city) === false) {saveToLocalStorage();return city;} 
  else if (!city) {alert("Unable to locate forecast. Please enter a valid city name.");}}

// event handler for search city button
$("#submit").on("click",(x) => {x.preventDefault();getCity();search();$("#city-input").val("");});

function search() {
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIkey}`;
    let coordinates = [];
    
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
   
    coordinates.push(response.coord.lat);
    coordinates.push(response.coord.lon);

    let cityName = response.name;
    let conditions = response.weather[0].description.toUpperCase();
    let temperature = response.main.temp;
    let icon = response.weather[0].icon;
    let maxTemp = response.main.temp_max;
    let humidity = response.main.humidity;
    let cityWind = response.wind.speed;
    
    $("#icon").html(`<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`);
    $("#city-name").html(cityName);
    $("#conditions").text("Current Conditions: " + conditions);
    $("#temp").text("Current Temp: " + temperature.toFixed(1) + " °F");
    $("#high").text("Expected High: " + maxTemp.toFixed(1) + " °F");
    $("#humidity").text("Humidity: " + humidity + "%");
    $("#wind-speed").text("Wind Speed: " + cityWind + " mph");
    })}
   //END OF WEATHER RELATED JS

// Display todays date
const today = new Date();
let title = document.querySelector("#date");
title.textContent = today.toDateString();

//save schedule to local storage

let saveBtn = document.getElementById('save');


saveBtn.addEventListener('click', function(event) {

  event.preventDefault();

  let textArray = [];
  textArray = document.querySelectorAll('.description');

  let newArray = [];

  for(var i = 0; i < textArray.length; i++){
    newArray.push(textArray[i].value);
    }
    
localStorage.setItem('schedule', JSON.stringify(newArray));
  
})

function getSchedule() {
 
  let textArray = [];
  textArray = document.querySelectorAll('.description');

  let schedule = JSON.parse(localStorage.getItem('schedule'));

  if(!schedule){
    return;
  }

  for(var i = 0; i <textArray.length; i++) {
    textArray[i].value = schedule[i];
  }
  
  
  
}

getSchedule();