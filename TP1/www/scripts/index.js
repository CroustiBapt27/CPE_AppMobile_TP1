// Pour obtenir une présentation du modèle Vide, consultez la documentation suivante :
// http://go.microsoft.com/fwlink/?LinkID=397704
// Pour déboguer du code durant le chargement d'une page dans cordova-simulate ou sur les appareils/émulateurs Android, lancez votre application, définissez des points d'arrêt, 
// puis exécutez "window.location.reload()" dans la console JavaScript.

(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Gérer les événements de suspension et de reprise Cordova
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);
        getMeteoByLocation();
        $('#btnGetMeteo').click(getMeteoByCp);
        $('#btnGetFavoris').click(afficherFavoris);


        Microsoft.Maps.loadModule('Microsoft.Maps.Themes.BingTheme', {
            callback: function () {
                var map = new Microsoft.Maps.Map($('#divMap').get(0),
                    {
                        credentials: "Arl-frbfucATAoxoxgefsmbUBSwQHJatcgkmDz6X1eVKTIMYP9flFD1IHZ9kw1Wz",
                        mapTypeId: Microsoft.Maps.MapTypeId.road,
                        enableClickableLogo: false,
                        enableSearchLogo: false,
                        center: new Microsoft.Maps.Location(48.84, 2.36),
                        zoom: 13,
                        theme: new Microsoft.Maps.Themes.BingTheme()
                    });
                var mapCenter = map.getCenter();
                var epingle = new Microsoft.Maps.Pushpin(
                    mapCenter,
                    { width: 100, height: 50 }
                );
                map.entities.push(epingle);
            }
        });
        // TODO: Cordova a été chargé. Effectuez l'initialisation qui nécessite Cordova ici.
        //var parentElement = document.getElementById('deviceready');
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');
        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');
    };

    function selectionFavoris() {
        
        $('#zipcode').val("Hello");
        console.log('in test');
        return false
    }
    function afficherFavoris() {
        $('#favoris').text('');
        $('#ajouterFavoris').text('');
        
        var listeFavoris = JSON.parse(window.localStorage.getItem("favoris"));
        //var listeFavoris = ['69100', '21000', '10000'];  
        var favText = 'Liste des favoris :<form action="">';
        for (var i in listeFavoris) {
            var favoris = listeFavoris[i];
            favText += '<input type="radio" name="favSelect" class="favSelect" id="' + favoris + '" value="' + favoris + '"> ' + favoris + '<br>';
        }
        favText += '</form>';

        $('#favoris').append(favText);
        console.log(favoris);

        ($('.favSelect').click(selectionFavoris()));
        $('#ajouterFavoris').append('<input type=text id="favorisInput"/><input type=button value="Ajouter" id="btnAjouterFavoris"/>')
        $('#btnAjouterFavoris').click(ajouterFavoris);
        
        return false
    }

    function ajouterFavoris() {
        var listeFavorisAjout = JSON.parse(window.localStorage.getItem("favoris"));
        console.log(listeFavorisAjout);
        if (listeFavorisAjout == null) {
            listeFavorisAjout = [];
        }
        var newFav = $('#favorisInput').val();
        listeFavorisAjout.push(newFav);
        window.localStorage.setItem("favoris", JSON.stringify(listeFavorisAjout));
        afficherFavoris();
        return false
    }

    function onPause() {
        // TODO: cette application a été suspendue. Enregistrez l'état de l'application ici.
    };

    function onResume() {
        // TODO: cette application a été réactivée. Restaurez l'état de l'application ici.
    };
} )();