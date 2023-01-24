const apiKey = "ae066128e0b68bc2fa4da73e4a89735d";
const apiCountryUrl = "https://countryflagsapi.com/png/";

const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const TempElement = document.querySelector("#temperature span");
const DescElement = document.querySelector("#desription");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidicyElement = document.querySelector("#humidicy");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector(".weather-data");

// funçoes

const getWeatherData = async (city) => {
  const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metrics&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherUrl);
  const data = await res.json();

  return data;
};

const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  cityElement.innerHTML = data.name;
  TempElement.innerHTML = parseInt((data.main.temp))
  DescElement.innerHTML =data.weather[0].description;
  weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
  countryElement.setAttribute("src", apiCountryUrl + data.sys.country)
  humidicyElement.innerHTML = `${data.main.humidity}%`
  windElement.innerHTML=`${data.wind.speed}km/h`
weatherContainer.classList.remove('hide')

};

// eventos

searchButton.addEventListener("click", (e) => {
  e.preventDefault();

  const city = cityInput.value;
  showWeatherData(city);
});


cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter"){
        const city = e.target.value
        showWeatherData(city)
    }
});