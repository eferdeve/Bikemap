class Slider {
    constructor(images, altImg, texte, idImg, idText) {
        this.images = images;
        this.altImg = altImg;
        this.texte = texte;
        this.i = 0;
        this.interval = 0;
        this.idImg = idImg;
        this.idText = idText;
        this.interval = setInterval(this.nextImg.bind(this), 5000);
        this.stop = document.getElementById('stop');
        this.Play = document.getElementById('play');
        this.gauche = document.getElementById('fleche_gauche');
        this.droite = document.getElementById('fleche_droite');
        // -------------------------------------------------------------------- EVENEMENTS --------------------------------------------------------------------
        //Evenement au click Stop
        this.stop.addEventListener('click', this.stopSlider.bind(this));
        //Evenement au click Play
        this.Play.addEventListener('click', this.startSlider.bind(this));
        //Evenement click gauche
        this.gauche.addEventListener('click', this.previousImg.bind(this));
        //Evenement au click droite
        this.droite.addEventListener('click', this.nextImg.bind(this));
        //Evenement fleches du clavier
        var that = this;
        window.onkeydown = function (event) {
            if (event.target.nodeName != "INPUT") {
                var key = event.keyCode;
                //fleche gauche
                if (key === 37) {
                    that.previousImg();
                }
                //fleche droite
                else if (key === 39) {
                    that.nextImg();
                }
            }
        }
    }
    //--------------------------------- METHODS --------------------------------------
    // Arrêt du slider
    stopSlider() {
        clearInterval(this.interval);
    }
    // Démarrage du slider
    startSlider() {
        this.interval = setInterval(this.nextImg.bind(this), 5000);
    }

    // Changement d'image en avancant
    nextImg() {
        this.i++;
        if (this.i == this.images.length) {
            this.i = 0;
        }
        if (this.i == this.altImg.length) {
            this.i = 0;
        }
        document.getElementById(this.idImg).src = this.images[this.i];
        document.getElementById(this.idImg).alt = this.altImg[this.i];

        document.getElementById(this.idText).textContent = this.texte[this.i];
    }

    // Changement d'image en reculant
    previousImg() {
        this.i--;
        if (this.i < 0) {
            this.i = this.images.length - 1;
        }
        if (this.i < 0) {
            this.i = this.altImg.length - 1;
        }
        document.getElementById(this.idImg).src = this.images[this.i];
        document.getElementById(this.idImg).alt = this.altImg[this.i];
        document.getElementById(this.idText).textContent = this.texte[this.i];
    }
}

