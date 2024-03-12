const fieldCity = document.getElementById("field-city");
const btnConfirm = document.getElementById("btn-confirm");
const currentTemp = document.getElementById("current-temp");
const feelsLike = document.getElementById("feelslike");
const description = document.getElementById("description");
const cityName = document.getElementById("city-name");
const iconWeather = document.getElementById("icon-weather");
const body = document.querySelector("body");

const url = "https://api.openweathermap.org";

async function getDataApi() {
    const wheatherURL = `${url}/data/2.5/weather?q=${fieldCity.value}&units=metric&lang=pt_br&appid=94f2162542577518465292d2fe11411c`;

    try {
        const response = await fetch(wheatherURL);
        const data = await response.json();

        if (data.cod && data.cod === "404") {
            cleanFields();
            return alert("Local não encontrado!");
        }

        const geoURL = `${url}/geo/1.0/direct?q=${fieldCity.value},${data.sys.country}&appid=94f2162542577518465292d2fe11411c`;
        const geoResponse = await fetch(geoURL);
        const req = await geoResponse.json();

        if (req.cod && req.cod === "404") {
            return alert("Estado não encontrado!");
        }

        loadData(data, req);
    } catch (error) {
        alert(error);
    }
}


function loadData(data, req) {
    currentTemp.innerHTML = `Temperatura atual: <span class="value">${Math.floor(data.main.temp)}° C</span>`;
    feelsLike.innerHTML = `Sensação térmica: <span class="value">${Math.floor(data.main.feels_like)}° C</span>`;
    description.innerHTML = `Descrição: <span class="value">${data.weather[0].description}</span>`;
    cityName.innerHTML = `<span class="value">${data.name}, ${req[0].state},${data.sys.country}</span>`;
    iconWeather.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
    backgroundWeather(data.weather[0].main);
}

function cleanFields() {
    currentTemp.innerHTML = "";
    feelsLike.innerHTML = "";
    description.innerHTML = "";
    cityName.innerHTML = "";
    iconWeather.innerHTML = "";
    removeBackground();
}

function removeBackground() {
    body.classList = "";
}

function backgroundWeather(weatherMain) {
    const weatherClass = `background-${weatherMain.toLowerCase()}`;
    removeBackground();
    body.classList.add(weatherClass);
}

btnConfirm.addEventListener("click", getDataApi);

fieldCity.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        getDataApi();
    }
});
