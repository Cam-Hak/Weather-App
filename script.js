// API Key for weather api
const APIKEY = "7eaf5d89dc324c28ad7215351242006";

// selecting HTML elements
const locationInput = document.querySelector(".header__location--input");
const locationSubmitBtn = document.querySelector(".header__location--btn");
const weatherDisplay = document.querySelector(".weather");
const weatherLocation = document.querySelector(".weather__location");
const weatherCondition = document.querySelector(".weather__condition");
const weatherUV = document.querySelector(".weather__stats--uv");
const weatherTemp = document.querySelector(".weather__stats--temp");
const weatherPrecip = document.querySelector(".weather__stats--precip");
const weatherIcon = document.querySelector(".weather__condition--icon");

// accessing weather api and passing data to updateWeatherInfo function
const fetchWeatherData = async function (locationInput) {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${locationInput}&days=1&aqi=no&alerts=no`;
  await fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("fetch response failed...");
      return response.json();
    })
    .then((data) => {
      updateWeatherInfo(data);
    })
    // handles case in which an invalid location has been entered
    .catch((error) => {
      console.error("There was a problem with fetch:", error);
      alert("location invalid...");
    });
};

// updates the icon shown based on the condition code given
const updateIcon = function (condition, results) {
  if (condition.icon.includes("day")) {
    results.forEach((row) => {
      if (row.code == condition.code) {
        weatherIcon.src = row.day;
        weatherDisplay.classList.remove("hidden");
      }
    });
  } else {
    results.forEach((row) => {
      if (row.code == condition.code) {
        weatherIcon.src = row.night;
        weatherDisplay.classList.remove("hidden");
      }
    });
  }
};

// reads the weather conditions csv file
const readCSV = function (condition) {
  fetch("weather_conditions.csv")
    .then((response) => response.text())
    .then((data) => {
      Papa.parse(data, {
        header: true,
        complete: function (results) {
          updateIcon(condition, results.data);
        },
        error: function (error) {
          console.error("Error parsing", error);
        },
      });
    });
};

// updates the data within the display elements
const updateWeatherInfo = function (data) {
  const rainChance = data.forecast.forecastday[0].day.daily_chance_of_rain;
  const snowChance = data.forecast.forecastday[0].day.daily_chance_of_snow;
  weatherPrecip.innerHTML = `${
    rainChance || snowChance
  }%<span>precipitation</span>`;
  weatherLocation.innerHTML = `${data.location.name}, ${data.location.region}`;
  weatherTemp.innerHTML = data.current.temp_f + "°";
  weatherCondition.innerHTML = data.current.condition.text;
  weatherUV.innerHTML = `${data.current.uv}<span>UV Index</span>`;
  // console.log(data);

  readCSV(data.current.condition);
};

// fetches and displays data on button click
locationSubmitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  fetchWeatherData(locationInput.value);
  locationInput.value = "";
});

// adds a listener to submit location when enter is hit
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    fetchWeatherData(locationInput.value);
    locationInput.value = "";
  }
});
