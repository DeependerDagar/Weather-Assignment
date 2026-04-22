const apiKey = "9375e25afb21b92d7fc18c8356bed5b3";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const city = document.getElementById("city");
const temp = document.getElementById("temp");
const weather = document.getElementById("weather");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

const historyDiv = document.getElementById("history");
const consoleOutput = document.getElementById("consoleOutput");


function log(message){
const line = document.createElement("div");
line.textContent = message;
consoleOutput.appendChild(line);

console.log(message);
}


searchBtn.addEventListener("click", function(){

consoleOutput.innerHTML = "";

const cityName = cityInput.value.trim();

if(cityName === ""){
alert("Please enter a city");
return;
}

getWeather(cityName);

});


cityInput.addEventListener("keypress", function(e){
if(e.key === "Enter"){
searchBtn.click();
}
});


async function getWeather(cityName){

log("Sync Start");
log("Fetching Weather Data...");

const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

try{

const response = await fetch(url);

if(!response.ok){
throw new Error("City not found");
}

const data = await response.json();

displayWeather(data);
saveCity(cityName);

log("Data Received");

}
catch(error){

log("Error fetching data");
alert("City not found");

}

}


function displayWeather(data){

city.textContent = data.name;
temp.textContent = data.main.temp + " °C";
weather.textContent = data.weather[0].main;
humidity.textContent = data.main.humidity + " %";
wind.textContent = data.wind.speed + " m/s";

}


function saveCity(cityName){

let history = JSON.parse(localStorage.getItem("cities")) || [];

if(!history.includes(cityName)){
history.push(cityName);
localStorage.setItem("cities", JSON.stringify(history));
}

loadHistory();

}


function loadHistory(){

historyDiv.innerHTML = "";

let history = JSON.parse(localStorage.getItem("cities")) || [];

history.forEach(function(cityName){

const btn = document.createElement("button");
btn.textContent = cityName;

btn.onclick = function(){
getWeather(cityName);
};

historyDiv.appendChild(btn);

});

}


window.onload = loadHistory;