class Design {
    constructor() {
        if ($('#nom').val().length > 0 && $('#prenom').val().length > 0) {

            $('#nom').click(this.animate('#nom', '40%').bind(this));
            $('#prenom').click(this.animate('#prenom', '40%').bind(this));
        }

    }
    // ----------------------------------------------- METHODS ----------------------------------------------
    animate(element, pourcentage) {
        $(element).animate({
            width: pourcentage,
        })
    }
}