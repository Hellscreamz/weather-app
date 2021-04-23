const getRequest = async (country) => {
    const APP_ID = "6e42d4dfe6e75b6779a9079dcfc082da";
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${APP_ID}&units=metric`);
    return response.json();
};

const dataSearch = (callback) => $('#btn_submit').on("click", callback);

dataSearch (async () => {
    
    const country = $('#input').val();
    const responseSearch = await getRequest(country);

    let environment = responseSearch.weather[0].description;
    let temperature = responseSearch.main.temp;
    let maxTemp = responseSearch.main.temp_max;
    let minTemp = responseSearch.main.temp_min;
    let tempFeelsLike = responseSearch.main.feels_like;
    let windSpeed = responseSearch.wind.speed + " m/s";
    let iconWeatherCondition = ` http://openweathermap.org/img/wn/${responseSearch.weather[0].icon}@2x.png`;
      
    const loadData = () => {
        $('.temperatures').empty();
        let item = `<div class="temperatures">
        <h3 id="temp_now">Temperature ${Math.ceil(temperature)} °C<br> </h3>
        <img id="normal" src="Icons/ecology_temperature_environment_icon_181690.ico">
        <h3 id="feels_like">Temp Feels Like <br> ${Math.ceil(tempFeelsLike)} °C<br> </h3>
        <h3 id="temp_max">Max Temperature <br> ${Math.ceil(maxTemp)} °C <br> </h3>
        <img id="sun" src="Icons/16_85259.ico">
        <h3 id="temp_min">Min Temperature <br> ${Math.ceil(minTemp)} °C <br> </h3>
        <img class="image_weather" ${'src',iconWeatherCondition}>
        <img id="cold" src="Icons/4003975-christmas-cold-emoji-freezing-santa_113003.ico">
        <img id="wind" src="Icons/wind_icon-icons.com_60569.ico">
        <img id="feels" src="Icons/face_smile_17859.ico">
        </div>`;
        $('.image_weather').attr('src',iconWeatherCondition);
        $('.temperatures').replaceWith(item);
    }
    loadData();
    
    const atmos = () => {
        let atmosphereItem = `<div class="atmosphere">
        <h1 id="wind_speed">Wind Speed <br> ${windSpeed}</h1>
        <img class="image_weather" ${'src',iconWeatherCondition}>
        <h1 id="description" > ${environment}</h1>
        </div>`;
        $('.image_weather').attr('src',iconWeatherCondition);
        $('.atmosphere').replaceWith(atmosphereItem);
        }
    atmos();    

    //buttons
    const btnCelsius = $('#celsius').on('click', function cels() {
        $(loadData).empty();
        loadData();
    });

    const btnFarenheit = $('#farenheit').on('click', function() {
        $('.temperatures').empty();
        item = `<h3 id="temp_now">Temperature ${Math.ceil(temperature * 1.8 + 32)} °F<br> </h3>
        <img id="normal" src="Icons/ecology_temperature_environment_icon_181690.ico">
        <h3 id="feels_like">Temp Feels Like <br> ${Math.ceil(tempFeelsLike * 1.8 + 32)} °F<br> </h3>
        <h3 id="temp_max">Max Temperature <br> ${Math.ceil(maxTemp * 1.8 + 32)} °F <br> </h3>
        <img id="sun" src="Icons/16_85259.ico">
        <h3 id="temp_min">Min Temperature <br> ${Math.ceil(minTemp * 1.8 + 32)} °F <br> </h3>
        <img class="image_weather" ${'src',iconWeatherCondition}>
        <img id="cold" src="Icons/4003975-christmas-cold-emoji-freezing-santa_113003.ico">
        <img id="wind" src="Icons/wind_icon-icons.com_60569.ico">
        <img id="feels" src="Icons/face_smile_17859.ico">`;
        $('.image_weather').attr('src',iconWeatherCondition);
        $('.temperatures').append(item);
    });
    
});
