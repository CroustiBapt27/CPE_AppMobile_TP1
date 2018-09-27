// JavaScript source code

function getMeteoByCp() {
   
   var url = "http://api.openweathermap.org/data/2.5/weather?zip=" + $('#zipcode').val()
        + ",fr&appid=68a40fffe840bac1f3463b4c9a130473&units=metric&lang=fr";
   setValues(url);

    return false;
};

function getMeteoByLocation() {
    
    $('#store').text("Disponible sur Google Play");

    var onSuccess = function (position) {
        var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude
            + "&lon=" + position.coords.longitude + "&appid=68a40fffe840bac1f3463b4c9a130473&units=metric&lang=fr";
        setValues(url);
    };
    function onError(error) {
        $('#error').text('ERREUR DE RECUPERATION DES LOCALISATION');
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    return false;
};

function setValues(url) {

    $.getJSON(url, function (result) {
        console.log("success");
        $('#nom_ville').text(result.name);
        $('#description').text('METEO: ' + result.weather[0].description);
        $('#temperature').text('TEMPERATURE: ' + result.main.temp + ' C');
        $('#error').text('');
    })
        .fail(function () {
            console.log("error");
            $('#nom_ville').text('');
            $('#description').text('');
            $('#temperature').text('');
            $('#error').text('ERREUR DE RECUPERATION DE DONNEES');
        })
        .always(function () {
            console.log("complete");
        });
    
    return false;
}