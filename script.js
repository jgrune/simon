$(document).ready(function(){

//utilize objects to store arrays
var gameData = {
  simonSeq: [],
  userSeq: [],

}

//start game when button is clicked
$('#clickMe').on('click', startGame);
$('main div').on('click', userSequence);
$('#playAgain').on('click', function(){
  window.location.reload();
});

function startGame(){
  $('#clickMe').css('display','none');
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
      $('div, body').css('background-color', 'red')
      setTimeout(function () {
        $('div, body').removeAttr('style');
      }, 500);
        $('#playAgain').css('display','inline');
      //function to start over
    } else {
      console.log('match');
      nextRound();
    }
}
//if match, display success - move to round 2
function nextRound(){
  setTimeout(function () {
    startGame();
  }, 1000);
}
//round 2 - add a blink to array and do same check

//if no match, display loss - reset game

})
