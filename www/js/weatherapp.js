var xmlhttp;
var xmlhttp2;
var weatherForecast;
var weatherCurrent;
var ctemp = "&deg;C";
var kmh = " km/h";
var prcnt = "&percnt;";
var to = " &harr; ";

var loc = "lethbridge,ca"; // option to change location
var showIcon = true; // change to false if you want to use your own icon

window.onload = function() {
    weatherForecast =
        "http://api.openweathermap.org/data/2.5/forecast/daily?q=" +
        loc +
        "&cnt=1&units=metric&APPID=ac4442d3cc94f73f2a14aabd2a07da36";
    weatherCurrent =
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        loc +
        "&units=metric&APPID=ac4442d3cc94f73f2a14aabd2a07da36";
    weather();
};

function weather() {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", weatherForecast, true); //this changes the state of xmlhttp
    xmlhttp.send();
    xmlhttp.onreadystatechange = getWeatherForecast;

    xmlhttp2 = new XMLHttpRequest();
    xmlhttp2.open("GET", weatherCurrent, true); //this changes the state of xmlhttp
    xmlhttp2.send();
    xmlhttp2.onreadystatechange = getWeatherCurrent;
}

function getWeatherForecast() {
    // when readystate changes

    //check to see if the client -4 and server -200 is ready
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        var json = JSON.parse(xmlhttp.responseText);
        var today = json.list[0];

        function Forecast(Descrip, Icon, Wind, Max, Min, Humid) {
            document.getElementById("description").innerHTML = Descrip;
            document.getElementById("temprange").innerHTML = Min + to + Max;
            document.getElementById("wind").innerHTML = Wind;
            document.getElementById("humidity").innerHTML = Humid;
            if (showIcon) {
                document.getElementById("icon").src =
                    "http://openweathermap.org/img/wn/" + Icon + "@2x.png";
            }
        }

        var current = new Forecast(
            today.weather[0].description,
            today.weather[0].icon,
            today.speed + kmh,
            today.temp.max + ctemp,
            today.temp.min,
            today.humidity + prcnt
        );

        console.log("all info received from server");
    } else {
        console.log("no dice");
    }
}

function getWeatherCurrent() {
    // when readystate changes

    //check to see if the client -4 and server -200 is ready
    if (xmlhttp2.readyState === 4 && xmlhttp2.status === 200) {
        var json = JSON.parse(xmlhttp2.responseText);
        var temp = Math.round(json.main.temp) + ctemp;
        document.getElementById("temp").innerHTML = temp;
        console.log("all info received from server");
    } else {
        console.log("no dice");
    }
}
