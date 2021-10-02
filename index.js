

let longPosition;

let latPosition;

const kelvin = 273;

let alert1 = document.querySelector(".alert");

let temperature = document.querySelector(".temperature");

let summery = document.querySelector(".summery");

let loc = document.querySelector(".location");

let icon = document.querySelector(".icon");

let coordinates = document.querySelector(".cordinates");

let search_text = document.getElementById("search_text");

let search_btn = document.getElementById("search_btn");

let weather_block = document.querySelector(".weather");

var search_text_length;

let empty_err = document.getElementById('alert');


const loader = document.querySelector('.loading')

load();
function load() {
    loader.classList.add('display');

    // setTimeout(()=>{
    //     loader.classList.remove('display');
    // },5000)
}


function loadremove() {
    loader.classList.remove('display')
    weather.classList.add('display')
}

const weather = document.querySelector('.content')

let wind_speed = document.querySelector(".wind_speed");

let pressure = document.querySelector(".pressure");
let wind_deg = document.querySelector(".wind_deg");
let humidity = document.querySelector(".humidity");
let temp_min = document.querySelector(".temp_min");
let temp_max = document.querySelector(".temp_max");
let sunrise = document.querySelector(".sunrise");
let sunset = document.querySelector(".sunset");



search_text.addEventListener("change", (e) => {
    search_text = e.target.value.trim();
});

search_btn.addEventListener("click", () => {
    search();

});




const API = "YOUR_API_ID";




//getCurrent Location
window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition
            ((position) => {

                longPosition = position.coords.longitude;
                latPosition = position.coords.latitude;
                getWeather();
            })
    }
});


//unix to time
function totime(unix_timestamp) {
    var date = new Date(unix_timestamp * 1000);

    var hours = date.getHours();

    var minutes = "0" + date.getMinutes();

    var seconds = "0" + date.getSeconds();

    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    console.log(formattedTime);
    return formattedTime;
}


//getWeather of Current Location
function getWeather() {

    console.log("Lattitude:" + latPosition);
    console.log("Longitude:" + longPosition);
    // API URL
    const base = `https://api.openweathermap.org/data/2.5/weather?lat=${latPosition}&lon=${longPosition}&appid=${API}`;

    //call API
    fetch(base)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            loadremove()
            // console.log(data);
            temperature.textContent = Math.floor(data.main.temp - kelvin) + "°C";
            summery.textContent = data.weather[0].description;
            loc.textContent = data.name + "," + data.sys.country;
            let icon_url = data.weather[0].icon;
            icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon_url}.png"  />`;
            // console.log(data.id);
            coordinates.textContent = "Lattitude:" + latPosition + "  |  Longitude:" + longPosition;


            wind_speed.textContent = "Wind Speed: " + data.wind.speed + "m/s";

            wind_deg.textContent = "Wind Degree: " + data.wind.deg + "°";
            sunrise.textContent = "Sunrise At : " + totime(data.sys.sunrise);


            sunset.textContent = "Sunset At : " + totime(data.sys.sunset);


            humidity.textContent = "Humidity : " + data.main.humidity + "%";

            temp_max.textContent = "Temp Max: " + Math.floor(data.main.temp_max - kelvin) + "°C";

            temp_min.textContent = "Temp Min: " + Math.floor(data.main.temp_min - kelvin) + "°C";

            pressure.textContent = "Pressure: " + data.main.pressure + " hPa";



        });



}



//get Weather fROM SEARCH LOCATION
function search() {
    const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${search_text}&appid=${API}`;
    fetch(baseURL)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            alert1.style.display = "none";
            empty_err.style.display = "none";
            weather_block.style.display = "block";

            console.log(data);
            temperature.textContent = Math.floor(data.main.temp - kelvin) + "°C";

            let summery = data.weather[0].description.toUpperCase();
            summery.textContent = summery;
            loc.textContent = data.name + "," + data.sys.country;
            let icon_url = data.weather[0].icon;
            latPosition = data.coord.lon;
            longPosition = data.coord.lat;
            icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon_url}.png"  />`;
            console.log(data.id);
            coordinates.textContent = "Lattitude:" + latPosition + "  |  Longitude:" + longPosition;

            wind_speed.textContent = "Wind Speed: " + data.wind.speed + "m/s";

            wind_deg.textContent = "Wind Degree: " + data.wind.deg + "°";

            sunrise.textContent = "Sunrise At : " + totime(data.sys.sunrise);


            sunset.textContent = "Sunset At : " + totime(data.sys.sunset);

            humidity.textContent = "Humidity : " + data.main.humidity + "%";

            temp_max.textContent = "Temp Max: " + Math.floor(data.main.temp_max - kelvin) + "°C";

            temp_min.textContent = "Temp Min: " + Math.floor(data.main.temp_min - kelvin) + "°C";

            pressure.textContent = "Pressure: " + data.main.pressure + " hPa";



        })
        .catch((error) => {

            console.log("Error");
            empty_err.style.display = 'block';
            empty_err.innerHTML="Enter valid City or something Error"
            



        });
}

