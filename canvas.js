class Canvas {
    constructor() {
        //déclaration de variable utiles dans pour les Methods
        this.btnEffacer = document.querySelector("#clearSignature");
        this.canvas = document.getElementById("canvas");
        this.cont = this.canvas.getContext("2d");
        this.signer = false;
        this.vide = true;
        this.canvas.width = 300;
        this.canvas.height = 200;
        this.cont.lineWidth = 2;
        this.cont.strokeStyle = "#000";
        this.reserSignature = document.getElementById("reserSignature");
        //------------------------------------------------------------------> Evenements <------------------------------------------------------------------
        //comencer a dessigner
        this.canvas.addEventListener("touchstart", this.touchStart.bind(this), false);
        this.canvas.addEventListener("touchmove", this.touchMove.bind(this), false);
        this.canvas.addEventListener("mousedown", this.start.bind(this));
        //Stop dessin
        this.canvas.addEventListener("mouseup", this.stop.bind(this));
        //trace du dessin
        this.canvas.addEventListener("mousemove", this.draw.bind(this));
        //Effacer dessin avec le bouton "Effacer"
        this.btnEffacer.addEventListener("click", this.delete.bind(this));   
    }

    //------------------------------------------------------------------> Methods <------------------------------------------------------------------
    touchStart(e) {
        e.preventDefault();
        const rect = e.target.getBoundingClientRect();
        this.signer = true;
        this.vide = false;
        this.cont.beginPath();
        this.cont.moveTo(e.targetTouches[0].clientX - rect.left, e.targetTouches[0].clientY - rect.top);
    }

    touchMove(e) {
        e.preventDefault();
        const rect = e.target.getBoundingClientRect();
        this.cont.lineTo(e.targetTouches[0].clientX - rect.left, e.targetTouches[0].clientY - rect.top);
        this.cont.stroke();
        $('#reserSignature').show();
    }

    start(e) {
        $('#reserSignature').show();
        this.signer = true;
        this.vide = false;
        this.draw(e);
    }

    stop(e) {
        e.preventDefault();
        this.signer = false;
        this.cont.beginPath();
    }

    draw(e) {
        if (!this.signer) return;
        this.cont.lineTo(e.offsetX, e.offsetY);
        this.cont.stroke();
        this.cont.beginPath();
        this.cont.moveTo(e.offsetX, e.offsetY);
    }

    delete() {
        $('#reserSignature').hide();
        this.cont.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.vide = true
    }
}



