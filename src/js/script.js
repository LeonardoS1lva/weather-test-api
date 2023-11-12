const fieldCity = document.getElementById("field-city");
const btnConfirm = document.getElementById("btn-confirm");
const currentTemp = document.getElementById("current-temp");
const feelsLike = document.getElementById("feelslike");
const description = document.getElementById("description");
const cityName = document.getElementById("city-name");
const iconWeather = document.getElementById("icon-weather");
const body = document.querySelector("body");

async function getDataApi() {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${fieldCity.value}&units=metric&lang=pt_br&appid=94f2162542577518465292d2fe11411c`;

    try {
        await fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (data?.cod && data.cod === "404") {
                    cleanFields();
                    return alert("Local não encontrado!");
                }
                loadData(data);
            });
    } catch (error) {
        alert(error);
    }
}

function loadData(data) {
    currentTemp.innerHTML = `Temperatura atual: <span class="value">${Math.floor(data.main.temp)}° C</span>`;
    feelsLike.innerHTML = `Sensação térmica: <span class="value">${Math.floor(data.main.feels_like)}° C</span>`;
    description.innerHTML = `Descrição: <span class="value">${data.weather[0].description}</span>`;
    cityName.innerHTML = `<span class="value">${data.name}, ${data.sys.country}</span>`;
    iconWeather.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
    backgroundWeather(data);
}

function cleanFields() {
    currentTemp.innerHTML = "";
    feelsLike.innerHTML = "";
    description.innerHTML = "";
    cityName.innerHTML = "";
    iconWeather.innerHTML = "";
}

function removeBackground() {
    body.classList.remove("backgroud-clear");
    body.classList.remove("backgroud-thunderstorm");
    body.classList.remove("backgroud-drizzle");
    body.classList.remove("backgroud-rain");
    body.classList.remove("backgroud-snow");
    body.classList.remove("backgroud-mist");
    body.classList.remove("backgroud-clouds");
    body.classList.remove("backgroud-default");
}

function backgroundWeather(data) {
    switch (data.weather[0].main) {
        case "Clear":
            removeBackground();
            body.classList.add("backgroud-clear");
            break;
        case "Thunderstorm":
            removeBackground();
            body.classList.add("backgroud-thunderstorm");
            break;
        case "Drizzle":
            removeBackground();
            body.classList.add("backgroud-drizzle");
            break;
        case "Rain":
            removeBackground();
            body.classList.add("backgroud-rain");
            break;
        case "Snow":
            removeBackground();
            body.classList.add("backgroud-snow");
            break;
        case "Mist":
            removeBackground();
            body.classList.add("backgroud-mist");
            break;
        case "Clouds":
            removeBackground();
            body.classList.add("backgroud-clouds");
            break;
        default:
            removeBackground();
            body.classList.add("backgroud-default");
            break;
    }
}

btnConfirm.addEventListener("click", () => {
    getDataApi();
});

fieldCity.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        getDataApi();
    }
})
