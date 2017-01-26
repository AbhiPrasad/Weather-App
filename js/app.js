$(document).ready(getLocation);

function getLocation() {

    if (!navigator.geolocation) {
        $('#out').html("<p>Geolocation is not supported by your browser</p>");
        return;
    }

    function success(position) {
        $.getJSON(quoteAPI).done(updateQuote).fail(errMsg);

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        $('#out').html('<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>');
    }

    function error() {
        $('#out').html("Unable to retrieve your location");
    }

    $('#out').html("<p>Locating…</p>");

    navigator.geolocation.getCurrentPosition(success, error);
}