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

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let apiKey = `82d623942976c17e87d20abb94fc530f`;
  let units = "metric";
  let city = cityInput.value.toUpperCase();
  if (cityInput.value.length < 1) city = "Kyiv";

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displayWeather);
}

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let weatherDescription = document.querySelector("#weatherDescription");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = temperature;
  weatherDescription.innerHTML = response.data.weather[0].main;
  wind.innerHTML = response.data.wind.speed;
  humidity.innerHTML = response.data.main.humidity;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentTempButton = document.querySelector("#getLocationTemp");
currentTempButton.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(retrievePosition);
});

function retrievePosition(position) {
  let apiKey = `82d623942976c17e87d20abb94fc530f`;
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displayWeather);
}
