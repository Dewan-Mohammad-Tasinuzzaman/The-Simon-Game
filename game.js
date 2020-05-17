

var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;

var i = 0;

// SEQUENCE
function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  $("h1").text("Level " + level);
  level++;

}

//The User Click
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  //HERE STARTS THE CHECKING

  while (i <= gamePattern.length) {

    if(userClickedPattern[i] === gamePattern[i]) {

      if(userClickedPattern.length === gamePattern.length) {

        userClickedPattern = [];
        setTimeout(function() {
        //your code to be executed after 1 second
        nextSequence();
        }, 1000);
        i = 0;
        break;
      } else {
        i++;
        break;
      }

    } else {

        var audio = new Audio('sounds/'+ 'wrong' + '.mp3');
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function() {
          $("body").removeClass("game-over");
        }, 200);

        i = 0;
        level = 1;
        userClickedPattern = [];
        gamePattern = [];

        $("h1").text("Gamer Over. Press Any Key To Restart.");
        break;
      }

  }

});

//Sound Playing
function playSound(name) {

  var audio = new Audio('sounds/'+ name + '.mp3');
  audio.play();

}

//Press Animation
function animatePress(currentColour) {

  $("#"+currentColour).addClass("pressed");

  setTimeout(function() {
  //your code to be executed after 1 second
  $("#"+currentColour).removeClass("pressed");
  }, 100);

}

//Game Starter- Pressing Any Keyboard Key.
$("body").keypress(function(event) {

  if(gamePattern.length === 0){
    nextSequence();
  } else {
    alert("You haven't lost. Don't Give Up!")
  }

})
