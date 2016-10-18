$(document).ready(function(){

//utilize objects to store arrays
var gameData = {
  simonSeq: [],
  userSeq: [],
  round: 1
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
  var colorIndex = Math.floor(Math.random()*8);
  gameData.simonSeq.push($('main div').eq(colorIndex).attr('id'))
  // console.log(gameData.simonSeq);

}

function blinkSequence(){
  console.log(gameData.simonSeq);
  gameData.simonSeq.forEach(function(simonColor, i){
    setTimeout(function(){
      $('main div#' + simonColor).fadeOut("500").fadeIn("500");
    }, 1000 * i);
  })
}

function userSequence(){
  $(this).fadeOut("500").fadeIn("500");
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
//round 2 - add a blink to array and do same check

//if no match, display loss - reset game

})
