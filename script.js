$(document).ready(function(){

  //utilize objects to store arrays
  var gameData = {
    simonSeq: [],
    userSeq: [],
    round: 1,
    divNum: 8,
  }

  //set click events
  $('#clickMe').on('click', startGame);
  $('main div').on('click', userSequence);

  function startGame(){
    $('.newButton').html("<h1>Round: <span id='roundnumber'>" + gameData.round + "</span></h1>");
    createSequence();
    blinkSequence();
  }
  //round 1 - blink a color on the screen and store that in an array

  function createSequence(){
    var color;
    var colorIndex = Math.floor(Math.random()*gameData.divNum);
    gameData.simonSeq.push($('main div').eq(colorIndex).attr('id'))
  }

  function blinkSequence(){
    console.log(gameData.simonSeq);
    gameData.simonSeq.forEach(function(simonColor, i){
      setTimeout(function(){
        $('main div#' + simonColor).fadeTo("500", 1).fadeTo("500", 0.6);
      }, 1000 * i);
    })
  }

  function userSequence(){
    $(this).fadeTo("500", 1).fadeTo("500", 0.6);
    gameData.userSeq.push($(this).attr('id'))
    if(gameData.userSeq.length < gameData.simonSeq.length){
      console.log(gameData.userSeq);
    } else {
      console.log(gameData.userSeq);
      checkUser();
      gameData.userSeq = [];}
    }

    //wait for user to match that - store user input in second array
    function checkUser(){
      var x = true;
      gameData.simonSeq.forEach(function(color, i){
        if (color !== gameData.userSeq[i]){
          x = false;
        }})

        if (x === false){
          console.log('no match');
          $('body').css('background-color', '#DF001B')
          setTimeout(function () {
            $('body').removeAttr('style');
          }, 500);
          $('.newButton').html("<button id = 'playAgain'>Play Again</button>");

          //function to start over
          $('#playAgain').on('click', function(){
            window.location.reload();
          });

    //blinks random lights for a while

        setInterval(function () {
          $('main div').eq(Math.floor(Math.random()*gameData.divNum)).fadeTo("500", 1).fadeTo("500", 0.6);
        }, 100);



        } else {
          console.log('match');
          nextRound();
        }
      }
      //if match, display success - move to round 2
      function nextRound(){
        gameData.round++;
        setTimeout(function () {
          startGame();
        }, 1000);
      }
    })
