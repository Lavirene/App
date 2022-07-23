function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let celciusTemperature = null;


function search(city) {

  let apiKey = `82d623942976c17e87d20abb94fc530f`;
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displayWeather);
}


function submitSearch(event) {

  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value.toUpperCase();
  if (cityInput.value.length < 1) city = "Kyiv";

  search(city);
}

function displayWeather(response) {

  celciusTemperature = Math.round(response.data.main.temp);
  let imageUrl = response.data.weather[0].icon;
  let imageLink = `http://openweathermap.org/img/wn/${imageUrl}@2x.png`;

  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let imageElement = document.querySelector("#weather-icon");
  let weatherDescription = document.querySelector("#weather-description");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = celciusTemperature;
  imageElement.setAttribute('src', imageLink);
  weatherDescription.innerHTML = response.data.weather[0].main;
  wind.innerHTML = response.data.wind.speed;
  humidity.innerHTML = response.data.main.humidity;

}

// function convertToFahrenheit(event) {
//     event.preventDefault();
//     if ( celciusTemperature != null ) {
//         celciusSwitcher.classList.remove('active')
//         fahrenheitSwitcher.classList.add('active')
//
//         let fahrenheitTemperature = Math.round(celciusTemperature * 5 / 9 - 32);
//         let temperatureElement = document.querySelector("#temperature");
//         temperatureElement.innerHTML = fahrenheitTemperature;
//     }
// }
//
// function convertToCelcius() {
//     event.preventDefault();
//
//     celciusSwitcher.classList.add('active')
//     fahrenheitSwitcher.classList.remove('active')
//
//     let temperatureElement = document.querySelector("#temperature");
//     console.log(celciusTemperature)
//     temperatureElement.innerHTML = celciusTemperature;
//
//
// }

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitSearch);

// let fahrenheitSwitcher = document.querySelector('#fahrenheitSwitcher');
// fahrenheitSwitcher.addEventListener('click', convertToFahrenheit);

// let celciusSwitcher = document.querySelector('#celciusSwitcher');
// celciusSwitcher.addEventListener('click', convertToCelcius);

search("Kyiv");

// let currentTempButton = document.querySelector("#getLocationTemp");
// currentTempButton.addEventListener("click", function () {
  // navigator.geolocation.getCurrentPosition(retrievePosition);
// });

// function retrievePosition(position) {
//   let apiKey = `82d623942976c17e87d20abb94fc530f`;
//   let units = "metric";
//   let lat = position.coords.latitude;
//   let lon = position.coords.longitude;
//   let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
//   axios.get(url).then(displayWeather);
// }
