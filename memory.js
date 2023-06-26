const container = document.querySelector('.fireworks');
const fireworks = new Fireworks.default(container, {autoresize: false});


var cards = ["grzyb.jpg", "grzyb.jpg", "karol.jpg", "karol.jpg", 
             "malec.jpg", "malec.jpg", "olo.jpg", "olo.jpg",
             "typek.jpg", "typek.jpg", "zyla.jpg", "zyla.jpg"];

function shuffleArray(array){
    for(var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  
cards = shuffleArray(cards);             
   
for(let i=0; i<12; i++){
    document.getElementById('c' + i).addEventListener("click", function() {revealCard(i);});
}

var oneVisible = false;
var turnCounter = 0;
var visibleNr;
var lock = false;
var pairsLeft = 6;
var visibleCards = [];

function revealCard(nr){

    var opacityValue = $('#c'+nr).css('opacity');
    

    if(opacityValue != 0 && lock == false && !visibleCards.includes(nr)){
        lock = true;
        visibleCards.push(nr);

        var image = "url(img/" + cards[nr] + ")";

        $('#c'+nr).css('background-image', image); 
        $('#c'+nr).addClass('cardActive');
        $('#c'+nr).removeClass('card');

        if(oneVisible == false){
            //first card
            oneVisible = true;
            visibleNr = nr; 
            lock = false;
        }
        else{
            if(cards[visibleNr] == cards[nr] && visibleNr != nr){ 
                setTimeout(function() {hide2Cards(nr, visibleNr)}, 750);
            } 
            else{ 
                setTimeout(function() { restore2Cards(nr, visibleNr)}, 1000);
            }

            turnCounter++;
            $('.score').html('Liczba prób: '+turnCounter);
            oneVisible = false;
        }
    }
}

function hide2Cards(nr1, nr2){
    $('#c'+nr1).css('opacity', '0');
    $('#c'+nr2).css('opacity', '0');
    pairsLeft--;

    if(pairsLeft == 0){
        fireworks.launch(5);
        $('.board').html('<h1>Gratulacje!<br> Liczba prób: '+turnCounter +'</h1>');

    }

    lock = false;
}

function restore2Cards(nr1, nr2){

    if(visibleCards.indexOf(nr1) !== -1){
        visibleCards.splice(visibleCards.indexOf(nr1), 1);
    }
    if(visibleCards.indexOf(nr2) !== -1){
        visibleCards.splice(visibleCards.indexOf(nr2), 1);
    }
    $('#c'+nr1).css('background-image', 'url(img/karta.jpg');
    $('#c'+nr1).addClass('card');
    $('#c'+nr1).removeClass('cardActive');

    $('#c'+nr2).css('background-image', 'url(img/karta.jpg');
    $('#c'+nr2).addClass('card');
    $('#c'+nr2).removeClass('cardActive');
    lock = false;
}

function refreshPage(){
    
    window.location.reload();
}

