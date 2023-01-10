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
$("#submit").on("click",(x) => {x.preventDefault();getCity();search();$("#city-input").val("");listCities();});

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
