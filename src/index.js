function updateWeather (response) {
let tempElement = document.querySelector("#temp");
let temperature = response.data.temperature.current;
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#codition-description")
let humidityElement = document.querySelector("#humidity");
let windSpeedElement = document.querySelector("#wind-speed");

cityElement.innerHTML= response.data.city;
tempElement.innerHTML = Math.round (temperature);
descriptionElement.innerHTML = response.data.condition.description;
humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", submitSearch);

searchCity("Cairo"); 

