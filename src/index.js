function updateWeather (response) {
    let tempElement = document.querySelector("#temp");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#codition-description")
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date (response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    
    cityElement.innerHTML= response.data.city;
    tempElement.innerHTML = Math.round (temperature);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
    timeElement.innerHTML = formatDate(date);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"  />`;
}

function formatDate(date){
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days =[
        "Sunday",
        "Monday", 
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday", 
    ];
    let day = days[date.getDay()];
    if (minutes < 10) {
    minutes = `0${minutes}`;
  }
    return `${day} ${hours}:${minutes}`;
}

function searchCity (city) {
    let apiKey = "0576695642baeo5ffb491e0t30b39d4a";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`
    axios.get(apiUrl).then(updateWeather);
}

function submitSearch(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    
    searchCity(searchInput.value);
}

function displayForecast(){
    
    let forecastdays = ["Tues", "Wed", "Thu", "Fri", "Sat"];
    let forecastHtml ="";

    forecastdays.forEach(function(day){
     forecastHtml =
      forecastHtml +   
    `<div class="weather-forecast-day">
     <div class="weather-forecast-date">${day}</div>
     <div class="weather-forecast-icon">
        <img src="https://ssl.gstatic.com/onebox/weather/64/rain_light.png" alt="" width="36"/>
     </div>
     <div class="weather-forecast-temperature">
        <span class="weather-forecast-temp-high"><strong>18°</strong></span>
        <span class="weather-forecast-temp-low">12°</span>
     </div>
    </div>`;})
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", submitSearch);
searchCity("Cairo"); 

displayForecast();



