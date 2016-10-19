$(document).ready(function(){

  //utilize objects to store arrays
  var gameData = {
    simonSeq: [],
    userSeq: [],
    round: 1,
    divNum: 8,
  }

  $('h3>span').html(sessionStorage.highscore);

  //set click events
  $('#clickMe').on('click', startGame);
  $('main div').on('click', userSequence);

  function startGame(){
    $('.newButton').html("<h1>Round: <span id='roundnumber'>" + gameData.round + "</span></h1>");
    $('h3>span').html(sessionStorage.highscore);
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
    } else {
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
          nextRound();
        }
      }
      //if match, display success - move to round 2
      function nextRound(){
        gameData.round++;

      //check high score
        if (!sessionStorage.highscore || (gameData.round > sessionStorage.highscore)){
          sessionStorage.highscore = gameData.round;
        }

        setTimeout(function () {
          startGame();
        }, 1000);
      }
    })
