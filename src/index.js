function updateWeather (response) {
    let tempElement = document.querySelector("#temp");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#codition-description")
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date (response.data.time *1000);
    let iconElement = document.querySelector("#icon");

    
    cityElement.innerHTML= response.data.city;
    tempElement.innerHTML = Math.round (temperature);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
    timeElement.innerHTML = formatDate(date);
     iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
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
    return `${day} ${hours}:${minutes},`;
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

