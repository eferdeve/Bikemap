// ------------------------------------------------------------------- Animation titre opacity scrollDown ------------------------------------------------------
$(document).ready(function () {
    $(window).scroll(function () {
        $('#container').css("opacity", 1 - $(window).scrollTop() / 500)
    })
})

// -------------------------------------------------------------------- Ajout des images et des textes du slider --------------------------------------------------------------------
var tabImages = [];
var tabTexte = [];
var altImg = [];

tabImages.push('./images/slider/diapo1.jpg');
tabImages.push('./images/slider/diapo2.png');
tabImages.push('./images/slider/diapo3.png');
tabImages.push('./images/slider/diapo4.png');
tabImages.push('./images/slider/diapo5.png');

altImg.push('BikeMap étape 1');
altImg.push('BikeMap étape 2');
altImg.push('BikeMap étape 3');
altImg.push('BikeMap étape 4');
altImg.push('BikeMap étape 5');

tabTexte.push('La ville de Lyon met à la location des vélos que vous pouvez réserver en quelques clics !');
tabTexte.push("Etape 1 : Vous n'avez plus qu'a choisir la station la plus proche de vous en la choississant sur la carte interactive de notre site.");
tabTexte.push('Etape 2 : Une confirmation de votre choix vous sera présenté afin que vous puissiez valider votre station.');
tabTexte.push("Etape 3 : Vous devrez ensuite remplir les champs obligatoire à la réservation du vélo afin qu'il n'y ai aucun problème au moment de le prendre.");
tabTexte.push('Etape 4 : Une signature élèctronique vous sera ainsi demandée pour pouvoir valider votre réservation, et le tour est joué !');

//Appel du slider
let sliderUn = new Slider(tabImages, altImg, tabTexte, "slideImg", "slideTxt");

// Pour éviter un délai d'affichage de 5sec de la 1ere image du slider
setTimeout("sliderUn.nextImg()", 0);

//-------------------------------------------------------------------- CARTE ET FORMULAIRE SIGNATURE --------------------------------------------------------------------
//Appel de la carte et des datas en getJSON
let carte = new Carte("map");
carte.getJSON();

//Appel du canvas signature
let canvas = new Canvas();

//Appel Reservation
let resa = new Reservation();
resa.activReserv();

//Appel Design
let design = new Design();










