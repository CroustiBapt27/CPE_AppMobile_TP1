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


       
        // TODO: Cordova a été chargé. Effectuez l'initialisation qui nécessite Cordova ici.
        //var parentElement = document.getElementById('deviceready');
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');
        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');
    };
    
    function afficherFavoris() {
        $('#favoris').text('');
        $('#ajouterFavoris').text('');
        
        var listeFavoris = JSON.parse(window.localStorage.getItem("favoris"));
        var favText = 'Liste des favoris :<form action="" id="formFav">';
        for (var i in listeFavoris) {
            var favoris = listeFavoris[i];
            favText += '<input type="radio" name="favSelect" class="favSelect" id="' + favoris + '" value="' + favoris + '"> ' + favoris + '<br>';
        }
        favText += '</form>';


        $('#favoris').append(favText);
        $('.favSelect').prop('checked', false);
        $('#formFav input').on('change', function () {
            $('#zipcode').val($('input[name=favSelect]:checked', '#formFav').val());
            getMeteoByCp();
        });

       
        //$('.favSelect').change(selectionFavoris($("input:radio[name='favSelect']:checked").val())); //change ? 
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