// **TIME AND DATE **//

let currentTime = new Date();

function currentDate(date) {
  let day = date.getDate();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];

  let weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let weekday = weekdays[date.getDay()];

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let rating = "th";
  if (day === 1 || day === 21) {
    rating = "st";
  } else {
    if (day === 2 || day === 22) {
      rating = "nd";
    } else {
      if (day === 3 || day === 23) {
        rating = "rd";
      } else {
        rating = "th";
      }
    }
  }
  return `${weekday}, ${month} ${day}${rating} ${hour}:${minutes}h`;
}

let displayTime = document.querySelector("#current-date-time");
displayTime.innerHTML = currentDate(currentTime);

// ** SEARCH ENGINE **//

function showWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.city;

  temperatureCelsius = response.data.temperature.current;

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );

  document.querySelector("#humidity-value").innerHTML =
    response.data.temperature.humidity;

  document.querySelector("#wind-speed-value").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  let currentTempIcon = document.querySelector("#current-temp-icon");
  currentTempIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  currentTempIcon.setAttribute("alt", response.data.condition.description);
}

function citySearchBar(event) {
  event.preventDefault();
  let city = document.querySelector("#searchbar").value;
  document.querySelector("#temperatureUnit").innerHTML = "ºC";
  searchCity(city);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition(position) {
  let apiKey = "62bc298785543e137bc6756e514eb1c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function searchCity(city) {
  let apiKey = "98f0981ob464a4bba9c346290ab1tcf2";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showTempFahrenheit(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = Math.round(
    (temperatureCelsius * 9) / 5 + 32
  );
  document.querySelector("#temperatureUnit").innerHTML = "ºF";
}

function showTempCelsius(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML =
    Math.round(temperatureCelsius);
  document.querySelector("#temperatureUnit").innerHTML = "ºC";
}
let temperatureCelsius = null;

let searchEngine = document.querySelector("#city-search-form");
searchEngine.addEventListener("click", citySearchBar);

let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", getCurrentLocation);

let fahrenheitBtn = document.querySelector("#selector-fahrenheit");
fahrenheitBtn.addEventListener("click", showTempFahrenheit);

let celsiusBtn = document.querySelector("#selector-celsius");
celsiusBtn.addEventListener("click", showTempCelsius);

searchCity("Vancouver");

/* FORECAST ENGINE - STILL UNDER WORK

function showWeeklyForecast(response) {
  let forecastIcon1 = document.querySelector("#forecast-icon-1");
  forecastIcon1.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[1].condition.icon}.png`
  );
  forecastIcon1.setAttribute(
    "alt",
    response.data.daily[1].condition.description
  );
} */

/* function weeklyForecast(city) {
  let apiKey = "98f0981ob464a4bba9c346290ab1tcf2";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeeklyForecast);
} */
