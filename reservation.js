class Reservation {
  constructor() {
    this.timerDiv = document.getElementById('timer');
    this.timer = 0;
    //------------------------------------------------------------- Evenements -------------------------------------------------------------
    $('#reserSignature').click(this.displayReserv.bind(this));
    $('#reserSignature').click(this.startTimer.bind(this));
    $('.annuler').click(this.cancelReservation.bind(this));
    $('#yesReserv').click(this.newReservYes.bind(this));
    $('#noReserv').click(this.newReservNo.bind(this));
    //Indexation des blocks formulaires, Affichages
    $('#reserForm').click(this.displayFormInfo.bind(this));
    //Sécurité formulaire nom prénom
    $('#signez').click(this.errorMsg.bind(this));
    if (window.sessionStorage.getItem('TimerMin')) {
      this.startTimer();
    }
  }
  //------------------------------------------------------------- Methods ------------------------------------------------------------
  // Persistance d'une reservation en cours ET associée au bouton "Oui"
  activReserv() {
    if (window.sessionStorage.getItem('TimerMin')) {
      $('#reservation').show();
      $('.station').html(sessionStorage.getItem('Station'));
      $('.nomReserv').html(localStorage.getItem('nom'));
      $('.prenomReserv').html(localStorage.getItem('prénom'));
    }
  }

  // Affichage div formulaire
  displayFormInfo() {
    $('#formInfo').fadeIn(1000);
    $('#nom').val(localStorage.getItem('nom'));
    $('#prenom').val(localStorage.getItem('prénom'));
    $('#infos_station').hide();
    if (window.sessionStorage.getItem('TimerMin')) {
      $('#blockNewReservChoice').show();
      $('#signez').hide();
    }
  }

  // Message d'erreur SI formulaire incomplet
  errorMsg() {
    var nom = $('#nom').val();
    var prenom = $('#prenom').val();
    if (nom.length == 0 || prenom.length == 0) {
      $('.erreur').show();
    } else {
      $('#signature').fadeIn(1000);
      localStorage.setItem("nom", nom);
      localStorage.setItem("prénom", prenom);
      $('#formInfo').hide();
      $('.erreur').hide();
    }
  }

  // Afficher la div réservation
  displayReserv() {
    clearInterval(this.timer);
    $('#reservation').fadeIn();
    $('.expReserv').hide();
    window.scrollTo(0, document.body.scrollHeight); // Scroll auto en bas de la page
    $('#signature').hide();
    $('#map').animate({
      width: '100%',
    });
    $('.station').html(sessionStorage.getItem('Station'));
    $('.nomReserv').html(localStorage.getItem('nom'));
    $('.prenomReserv').html(localStorage.getItem('prénom'));
    this.timerDiv.textContent = '';
  }

  // Timer de 20:00 ET conditions d'expiration du Timer
  startTimer() {
    let that = this;
    let seconds = 0;
    let minutes = 20;
    let timerMin = window.sessionStorage.getItem('TimerMin');
    let timerSec = window.sessionStorage.getItem('TimerSec');

    if (timerMin && timerSec) {
      minutes = timerMin;
      seconds = timerSec;
    }

    this.timer = setInterval(function () {

      timerMin = window.sessionStorage.setItem('TimerMin', minutes);
      timerSec = window.sessionStorage.setItem('TimerSec', seconds);

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      if (minutes == 0 && seconds == 0) {
        clearInterval(that.timer);
        $('#reservation').hide();
        $('.expReserv').show();
        $('#blockNewReservChoice').hide();
        $('#formInfo').hide();
        $('#infos_station').hide();
        $('#map').css('width', '100%');
        $('#signez').show();
        sessionStorage.clear();
        canvas.delete();

      } else if (seconds == 0) {
        minutes = minutes - 1;
        seconds = 59;
      } else {
        seconds = seconds - 1;
      }
      that.timerDiv.textContent = sessionStorage.getItem('TimerMin') + ':' + (('' + sessionStorage.getItem('TimerSec')).length > 1 ? '' : '0') + sessionStorage.getItem('TimerSec'); // Affichage du timer en html
    }, 1000);
  }

  // Annuler réservation
  cancelReservation() {
    sessionStorage.clear();
    canvas.delete();
    $('.cancelReserv').fadeIn().delay(3000).fadeOut(1000);
    $('#reservation').hide();
    $('#blockNewReservChoice').hide();
    $('#signez').show();
    $('#map').css('width', '100%');
    $('#formInfo').hide();
    $('#infos_station').hide();
    clearInterval(this.timer);
    this.timerDiv.textContent = '';
  }

  // Nouvelle réservation
  newReservYes() {
    this.timerDiv.textContent = '';
    sessionStorage.removeItem('TimerMin');
    sessionStorage.removeItem('TimerSec');
    canvas.delete();
    $('.cancelReserv').fadeIn().delay(3000).fadeOut(1000);
    $('#reservation').hide();
    $('.expReserv').hide();
    $('#blockNewReservChoice').hide();
    $('#signez').show();
    clearInterval(this.timer);
  }

  // Methode associé au bouton "Non"
  newReservNo() {
    $('#map').css('width', '100%');
    $('#formInfo').hide();
  }
}
