
let apiKey = `bce14d8aab9e4feb23181748e66debf1`
let url = `https://api.themoviedb.org/3/trending/movie/week?api_key=bce14d8aab9e4feb23181748e66debf1`
let movieArray = [ ]

function trendingMovies(){
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
              movieData.poster = "https://image.tmdb.org/t/p/w300" + data[i].poster_path 
              movieData.overview = data[i].overview
              allMovies.push(movieData)
            }
            console.log(allMovies)
            return allMovies
         })
        .then (function(allMovies){
            const movieIndex = Math.floor(Math.random() * allMovies.length)
            const item = allMovies[movieIndex]
            console.log(item)
            return item;
        })
        .then (function(item){
            let randomTitle = document.getElementById("movie-title")
            randomTitle.textContent = item.title
            let randomOverview = document.getElementById("overview")
            randomOverview.textContent = item.overview
            let randomPoster = document.getElementById("poster")
            randomPoster.setAttribute("src", item.poster)
        })
};

// trendingMovies();

// function getRandomMovie(arr) {
//     const movieIndex = Math.floor(Math.random() * allMovies.length)
//     const item = arr[movieIndex]
//     return item;
// }
// const result = getRandomMovie(allMovies)
//               console.log(result)


//WEATHER RELATED JS//

var APIkey = '2e64565d10dd2c4f4e922c655105f38b'

let city;

const getCity = () => {city = $("#city-input").val();
  if (city) {saveToLocalStorage();} 
  else {return}}
getCity()

const saveToLocalStorage = () => {localStorage.setItem("lastSearch", city);}

const loadRecentCity = () => {const storedCity = localStorage.getItem("lastSearch");
    if ("lastSearch"){city = storedCity; search()} 
    else; {return}}
loadRecentCity()
  
$("#search").on("click",(x) => {x.preventDefault();getCity();search();$("#city-input").val("");});

function search() {
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIkey}`;
    
    $.ajax({url: queryURL, method: "GET",}).then(function (response){

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

//modal code for bulma
document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});

let randomMov = document.getElementById('randomMov')
randomMov.addEventListener('click', trendingMovies)