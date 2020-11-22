const iconCard = document.querySelector(".weather-icon");
const descriptionCard = document.querySelector(".description");
const temperatureCard = document.querySelector(".temperature");
const windspeedCard = document.querySelector(".windspeed");
const humidityCard = document.querySelector(".humidity");
const weatherContainer = document.querySelector(".weather-container");
const titleText = document.querySelector("h1");
const searchButton = document.querySelector(".search-button");
const iconUri = 'http://openweathermap.org/img/wn/';



// Tar värde från sökfältet när man klickar på sök och skickar till fetch funktionen
searchButton.addEventListener('click', function(){
       searchCity();
    })


/**
 * Tar input från sökknappen och bygger en url. Hämtar data från API.
 * Om data returnerar 404 (City not found), visa felmeddelande i resultatdisplay
 * Annars skickas data vidare till funktioner för att hantera resultatet 
 *
 */    
function getJsonData(city) {  
    const apiKey = ''; // API Key
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    fetch(url).then(
        function(response){
        return response.json();
        }).then(
        function(data){
        if (data.cod == 404) {
            errorMessages(data);
        } else {
            iconImage(data.weather[0].icon);
            weatherDescription(data.weather[0].description);
            temperature(data.main.temp);
            windSpeed(data.wind.speed);
            humidity(data.main.humidity);
        }
        
        });
    }

// Hämtar värde från sökfältet och skickar till api fetch
function searchCity(){
    let cityName = document.querySelector(".search-box").value;
        getJsonData(cityName);
        document.querySelector(".search-box").value = "";
}

// Felmeddelanden om stat inte finns
function errorMessages(data){
    iconCard.textContent = data.message;
    descriptionCard.textContent = 'Description not found';
    temperatureCard.textContent = 'Temperature not found';
    windspeedCard.textContent = 'Wind speed not found';
    humidityCard.textContent = 'Humidity not found';
    weatherContainer.style.backgroundColor = '#000000';
}

/**
 * Först kollar vi om det redan finns någon child till parentnoden, om det finns ta bort.
 * Väderikonen ligger på annan url, så får bygga en sökstring med basurl (iconUri), icon från json och slutappend (@2x.png).
 * Skapar sen ett img element och lägger till vår url som src, sen appendar som child till iconCard.
 */
function iconImage(icon) {
    while (iconCard.hasChildNodes()){
        iconCard.removeChild(iconCard.firstChild);
    }
    let iconImage = iconUri + icon + "@2x.png";
    let image = document.createElement("img");
    image.src = iconImage;
    iconCard.appendChild(image);
}

/**
 * Först kollar vi om det redan finns någon child till parentnoden, om det finns ta bort.
 * Skapar ett h3 element och lägger i description från json, sedan appendas den till parentdiv
 * 
 */

function weatherDescription(description) {
    while (descriptionCard.hasChildNodes()){
        descriptionCard.removeChild(descriptionCard.firstChild);
    }
    let text = document.createElement("h3");
    text.innerHTML = description;
    descriptionCard.appendChild(text);
}

/**
 * Först kollar vi om det redan finns någon child till parentnoden, om det finns ta bort.
 * Skapar ett h3 element och lägger till temperatur, men först avrundar vi då json data visar decimal. Appendar sedan till parentDiv.
 * Skickar temperatur till funktion för att ändra bakgrundsfärg och h1 baserat på temperatur, som returnerar hex kod.
 */


function temperature(temp) {
    while (temperatureCard.hasChildNodes()){
        temperatureCard.removeChild(temperatureCard.firstChild);
    }
    let text = document.createElement("h3");
    text.innerHTML = Math.floor(temp) + " °C";
    temperatureCard.appendChild(text);
    let temperature = temperatureScale(Math.floor(temp));
    weatherContainer.style.backgroundColor = temperature; 
    titleText.style.color = temperature;
}

/**
 * Först kollar vi om det redan finns någon child till parentnoden, om det finns ta bort.
 * Skapar ett h3 element och lägger till windhastigheten i avrundad form.
 * 
 */


function windSpeed(wind) {
    while (windspeedCard.hasChildNodes()){
        windspeedCard.removeChild(windspeedCard.firstChild);
    }
    let text = document.createElement("h3");
    text.innerHTML = Math.floor(wind) + " m/s";
    windspeedCard.appendChild(text);
}

/**
 * Först kollar vi om det redan finns någon child till parentnoden, om det finns ta bort.
 * Skapar ett h3 element och lägger till fuktighet i procent.
 * 
 */


function humidity(hum) {
    while (humidityCard.hasChildNodes()){
        humidityCard.removeChild(humidityCard.firstChild);
    }
    let text = document.createElement("h3");
    text.innerHTML = hum + " %";
    humidityCard.appendChild(text);
}


// Tar in temp och baserat på detta returneras olika färger mellan rött till blått och en grå om inget värde stämmer.
function temperatureScale(temp) {

    if (temp <= 38 && temp >= 27) {
        return '#D01212';
    } else if (temp <= 26 && temp >= 16) {
        return '#d2ca0b';
    }else if (temp <= 15 && temp >= 0) {
        return '#cafbb6';
    }else if (temp < 0 && temp >= -10) {
        return '#535e7e';
    }else if (temp <= -9 && temp >= -20) {
        return '#a9b4ea';
    } else {
        return '#53555a';
    }
}