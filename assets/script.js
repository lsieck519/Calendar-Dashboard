
//RANDOM MOVIE GENERATOR

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

//END OF RANDOM MOVIE GENERATOR

//WEATHER RELATED JS//

var APIkey = '2e64565d10dd2c4f4e922c655105f38b'

let city;

function getCity() {
  city = $("#city-input").val();
  if (city) {saveToLocalStorage();
  } else {return}
}
getCity()

function saveToLocalStorage() {
  localStorage.setItem("lastSearch", city);
}

function loadRecentCity() {
  const storedCity = localStorage.getItem("lastSearch");
    if ("lastSearch"){
      city = storedCity; search()
    } else; {return}
  }
loadRecentCity()
  

$("#search").on("click",(x) => {
  x.preventDefault();
  getCity();
  search();
  $("#city-input").val("Search for another city");
})
;

let conditions;
let temperature;
let tempMax;
let tempMin;
let icon;
let humidity; 
let cityWind; 
let cityName;

function search() {
  // API Documentation https://openweathermap.org/current
    let weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIkey}`;
    
    fetch(weatherAPI)
    
    .then(function (response){
      return response.json() 
    })
    .then(function (data) {
      console.log(data);

      icon = data.weather[0].icon
      console.log(icon)
      $("#icon").html(`<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`);

      cityName = data.name
      console.log(cityName)
      let name = document.querySelector('#city-name');
      name.textContent = "Today's Weather in " + cityName + ":" 
    
      conditions = data.weather[0].description.toUpperCase();
      console.log(conditions)
      let CC = document.querySelector('#conditions');
      CC.textContent = conditions

      temperature = data.main.temp.toFixed(1);
      console.log(temperature)
      let temp = document.querySelector("#temperature")
      temp.textContent = "Temperature: " + temperature + " °F"

      tempMax = data.main.temp_max.toFixed(1);
      console.log(tempMax)
      let max = document.querySelector("#tempMax")
      max.textContent = "High: " + tempMax + " °F"

      tempMin = data.main.temp_min.toFixed(1);
      console.log(tempMin)
      let min = document.querySelector("#tempMin")
      min.textContent = "Low: " + tempMin + " °F"

      humidity = data.main.humidity;
      console.log(humidity)
      let hum = document.querySelector("#humidity")
      hum.textContent = "Humidity: " + humidity + "%"

      cityWind = data.wind.speed;
      console.log(cityWind)
      let wind = document.querySelector("#wind")
      wind.textContent = "Wind Speed: " + cityWind + " MPH"
   })     

  }
    
//END OF WEATHER RELATED JS


// TODAY'S DATE
const today = new Date();
let title = document.querySelector("#date");
title.textContent = today.toDateString();


//SCHEDULE WITH SAVE BUTTON
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

//BULMA MODAL CODE FOR MOVIE GENERATOR
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