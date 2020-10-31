class Carte {
   constructor(divMap) {
      this.map = L.map(divMap).setView([45.750000, 4.850000], 15);
      this.APImap = L.tileLayer(
         "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
         maxZoom: 18,
         id: "mapbox.streets",
         accessToken: "pk.eyJ1Ijoiem96bzk3MjMyIiwiYSI6ImNrMXFoczQ0bDE0YjQzZ2w4NzE0M3ZleGkifQ.3F03xwTBO7Tjdg2dOvNnFQ"
      }
      ).addTo(this.map);
   }
   getJSON() {
      $.getJSON(
         "https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=af30e5d04965575526af1a9a919a73ab528ad70f",
         station => {
            for (var i = 0; i < station.length; i++) {
               var marker = this.pointMarker(station[i].position.lat, station[i].position.lng);
               marker.setIcon(this.IconMarker(station[i].available_bikes, station[i].status))
               this.popup(
                  marker,
                  station[i].status,
                  station[i].address,
                  station[i].available_bikes,
                  station[i].available_bike_stands
               );
            }
         }
      );
   }
   //Method visuel marker
   IconMarker(nVelos, statut) {
      var choixMarker;
      var LeafIcon = L.Icon.extend({
         options: {
            iconSize: [20, 35],
            iconAnchor: [0, 50],
            popupAnchor: [21, -45],
         }
      });
      // Icon rouge = fermé
      if (statut === "CLOSED") {
         choixMarker = new LeafIcon({
            iconUrl: "./images/RedBike.png"
         });
         return choixMarker
         // Icon orange moins de 5 vélos
      }
      if (nVelos <= 5) {
         choixMarker = new LeafIcon({
            iconUrl: "./images/OrangeBike.png"
         });
         return choixMarker
         // Icon vert autre
      } else {
         choixMarker = new LeafIcon({
            iconUrl: "./images/GreenBike.png"
         })
         return choixMarker
      }
   }
   //Position des markers
   pointMarker(lat, lng) {
      var marker = L.marker([lat, lng], {
         icon: this.IconMarker()
      }).addTo(
         this.map
      );
      return marker;
   }

   popup(marker, statut, address, nVelos, nPlaces) {
      if (statut === "OPEN" && nVelos > 0) {
         // Au click sur un marker
         marker.on('click', function () {
            $("#infos_station").slideDown();
            // Au click sur marker
            $('#map').animate({
               width: '75%',
            });
            if (statut === "OPEN" && nVelos > 0) {
               //ouverture formulaire avec les bonnes données
               $("#infos_station").show().animate({ opacity: '1' }, 2000);
               $(".nomStation").text(address);
               sessionStorage.setItem("Station", address);
               $(".status").text('Ouvert').css("color", "#0DA145");
               $(".velosDispo").text(nVelos).css("color", "#0DA145");
               $(".placesDispo").text(nPlaces).css("color", "#0DA145");
               $(".name").hide();
               $('#formInfo').hide();
               $('#signature').hide();
               $('.cancelReserv').hide();
               $('.expired').hide();
               $('#reserSignature').hide();
            }
         });

         //Plus de Vélos
         if (statut === "OPEN" && nVelos === 0) {
            marker.bindPopup(
               $(
                  `<p>Station &#8594; <span>${address}</span><br>Velos disponibles &#8594; <span>${nVelos}</span><br><br><span style='color: red'>PAS DE VELOS DISPONIBLES</span></p>`
               )[0]
            );
         }
         // Popup STATION FERME
      } else {
         marker.bindPopup(
            $(
               `<p>Station &#8594; <span>${address}</span><br>Velos disponibles &#8594; <span>${nVelos}</span><br><br><span style='color: red'>STATION FERMÉE</span></p>`
            )[0]
         );
      }
   }
}














