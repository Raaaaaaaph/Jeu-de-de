$(document).ready(function () {
    
    var gamePlaying = true;
    var roundScore = 0;
    var activePlayer = 0;
    var scores = {'0': 0, '1': 0};

    $('.btn-roll').click(function () {
        if(gamePlaying !== false) {

            var dice = Math.floor(Math.random() * 6) + 1;
            $('.dice').css('display', 'block').attr("src","images/dice_" + dice + ".png");

            if(dice !== 1) {
                roundScore += dice;
                $('#current-' + activePlayer).text(roundScore);
            } else {
                nextPlayer();
            }
        }
    });

    function disable() {
        $('.btn-roll, .btn-hold').prop('disabled', true);
        setTimeout(function(){
            $('.btn-roll, .btn-hold').prop('disabled', false);
        }, 1000);
    }

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

    $('.btn-hold').click(function () {
        if(gamePlaying !== false) {
            scores[activePlayer] += roundScore;
            $('#score-' + activePlayer).text(scores[activePlayer]);

            if(scores[activePlayer] >= 10) {
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

    $('.btn-new').click(function () {
        gamePlaying = true;
        roundScore = 0;
        activePlayer = 0;
        scores = {'0': 0, '1': 0};
        
        $('.dice').attr('src','images/dice_4.png').css('display', 'block');
        $('#score-0, #score-1, #current-1, #current-2').text('0');
        $('#name-0').text('Joueur 1');
        $('#name-1').text('Joueur 2');
        $('.player-O-panel, .player-1-panel').removeClass('active');
        $('.player-0-panel').addClass('active');
        $('.confettis').css('display', 'none');
    });


});