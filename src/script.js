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
  document.querySelector("#city-name").innerHTML = response.data.name;

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity-value").innerHTML =
    response.data.main.humidity;

  document.querySelector("#wind-speed-value").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  let currentTempIcon = document.querySelector("#current-temp-icon");
  currentTempIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentTempIcon.setAttribute("alt", response.data.weather[0].main);
}

function searchCity(city) {
  let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function citySearchBar(event) {
  event.preventDefault();
  let city = document.querySelector("#searchbar").value;
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

let searchEngine = document.querySelector("#city-search-form");
searchEngine.addEventListener("click", citySearchBar);

let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", getCurrentLocation);

searchCity("New York");
