// added strings for api
var googleAPI = "http://maps.googleapis.com/maps/api/geocode/json?latlng=";
var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?";

// when document loads, get location
$(document).ready(getLocation);

// function that handles the api calls
function getLocation() {

    // if bad browser
    if (!navigator.geolocation) {
        $('#out').html("<p>Geolocation is not supported by your browser</p>");
        return;
    }

    // if location is succesfully obtained
    function success(position) {
        // get coordinates
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        //gets google API link
        googleAPI = googleAPI + latitude + "," + longitude + "&sensor=true";

        //gets location info through JSON by google API call
        $.getJSON(googleAPI).done(updateLocation).fail(errLocation);

        //function to get address from JSON
        function updateLocation(json) {
            var locationtext = JSON.stringify(json.results[0].formatted_address).replace(/"/g, "");
            console.log(locationtext);
            $('#locationinfo').text("Weather at: " + locationtext);
        }

        // If google API call failed
        function errLocation(jqxhr, textStatus, err) {
            console.log("Location Request Failed: " + textStatus + ", " + err);
        }

        //gets weather api link
        weatherAPI = weatherAPI + "lat=" + latitude + "&lon=" + longitude + "&appid=3fafe423bf2638b8fa7a8077494f6a20";

        //API call to openweather to get JSON info
        $.getJSON(weatherAPI).done(updateWeather).fail(errWeather);

        function updateWeather(json) {
            var weathertext = JSON.stringify(json.weather[0].main).replace(/"/g, "");
            console.log(weathertext);
            $('#weatherinfo').text("The weather is: " + weathertext);
        };

        // If weather API call failed
        function errWeather(jqxhr, textStatus, err) {
            console.log("Weather Request Failed: " + textStatus + ", " + err);
        }

        $('#out').html('<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>');
    }

    // if error in obtaining location
    function error() {
        $('#out').html("Unable to retrieve your location");
    }

    // Loading symbol
    $('#out').html("<p>Locating…</p>");

    //gets position
    navigator.geolocation.getCurrentPosition(success, error);
}