$(document).ready(function () {
    
    // VARIABLES
    var gamePlaying = true;
    var roundScore = 0;
    var activePlayer = 0;
    var scores = {'0': 0, '1': 0};
    var rotation = true;

    // FONCTIONS AU CLIC DU BOUTON "LANCER LE DÉ"
    $('.btn-roll').click(function () {
        if(gamePlaying !== false) {
            var dice = Math.floor(Math.random() * 6) + 1;
            $('.dice').css('display', 'block').attr("src","images/dice_" + dice + ".png");
            rotateOn();
            if(dice !== 1) {
                roundScore += dice;
                $('#current-' + activePlayer).text(roundScore);
            } else {
                nextPlayer();
            }
        }
    });

    // FONCTIONS AU CLIC DU BOUTON "GARDER LES POINTS"
    $('.btn-hold').click(function () {

        if(gamePlaying !== false) {
            scores[activePlayer] += roundScore;
            $('#score-' + activePlayer).text(scores[activePlayer]);

            if(scores[activePlayer] >= 100) {
                $('#name-' + activePlayer).text('Gagné !');
                $('.dice').css("display", "none");
                $('.confettis').css('display', 'block');
                $('#current-0, #current-1').text("0");
                gamePlaying = false;
            } else {
                nextPlayer();
            }
        }
    });

    // FONCTIONS AU CLIC DU BOUTON "NOUVEAU JEU"
    $('.btn-new').click(function () {
        gamePlaying = true;
        roundScore = 0;
        activePlayer = 0;
        scores = {'0': 0, '1': 0};
        
        $('.dice').attr('src','images/dice_4.png').css('display', 'block');
        $('#score-0, #score-1, #current-0, #current-1').text('0');
        $('#name-0').text('Joueur 1');
        $('#name-1').text('Joueur 2');
        $('.player-O-panel, .player-1-panel').removeClass('active');
        $('.player-0-panel').addClass('active');
        $('.confettis').css('display', 'none');
    });

    // FONCTION POUR EFFECTUER UNE ANIMATION DE ROTATION ENTRE LES LANCÉS DE DÉ
    function rotateOn() {
        
        if(rotation !== false) {
            $('.dice').addClass('rotate');
            rotation = false;
        } else {
            $('.dice').removeClass('rotate');
            rotation = true;
        }
    }

    // FONCTION POUR DÉSACTIVER LES BOUTONS
    function disable() {

        $('.btn-roll, .btn-hold, .btn-new').prop('disabled', true);
        setTimeout(function(){
            $('.btn-roll, .btn-hold, .btn-new').prop('disabled', false);
        }, 1000);
    }

    // FONCTION POUR CHANGER LE TOUR DES JOUEURS
    function nextPlayer() {

        if(activePlayer == 0) {
            activePlayer = 1;
        } else {
            activePlayer = 0;
        }
        roundScore = 0;

        $('#current-0, #current-1').text("0");
        $('.player-0-panel, .player-1-panel').toggleClass('active');
        $('.dice').fadeOut(1000);

        disable();
    }
});