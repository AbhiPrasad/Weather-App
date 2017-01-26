$(document).ready(getLocation);
var googleAPI = "http://maps.googleapis.com/maps/api/geocode/json?latlng=";
var weatherAPI = "api.openweathermap.org/data/2.5/weather?";

function getLocation() {

    if (!navigator.geolocation) {
        $('#out').html("<p>Geolocation is not supported by your browser</p>");
        return;
    }

    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        googleAPI = googleAPI + latitude + "," + longitude + "&sensor=true";

        $.getJSON(googleAPI).done(updateLocation).fail(errLocation);

        function updateLocation(json) {
            var locationtext = JSON.stringify(json.results[0].formatted_address).replace(/"/g, "");
            console.log(locationtext);
            $('#locationinfo').text("Weather at: " + locationtext);
        }

        function errLocation(jqxhr, textStatus, err) {
            console.log("Location Request Failed: " + textStatus + ", " + err);
        }

        $.getJSON(weatherAPI).done(updateLocation).fail(errLocation);

        $('#out').html('<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>');
    }

    function error() {
        $('#out').html("Unable to retrieve your location");
    }

    $('#out').html("<p>Locating…</p>");

    navigator.geolocation.getCurrentPosition(success, error);
}