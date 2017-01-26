// added strings for api
var googleAPI = "http://maps.googleapis.com/maps/api/geocode/json?latlng=";
var weatherAPI = "api.openweathermap.org/data/2.5/weather?";

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

        //API call to google maps to get JSON info
        $.getJSON(weatherAPI).done(updateLocation).fail(errLocation);

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