
var buttonColors=["red","blue", "green", "yellow"];
var gamepattern=[];
var userClickedPattern=[];
var started = false;
var level = 0;

$(document).keypress(function(){
    if (!started){
    $("#level-title").text("Level " + level);
    nextSequence(); 
    started = true;
    }

});

$(".btn").click(function(){
    
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    
    
 });



function nextSequence()
{
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomchosenColor = buttonColors[randomNumber];
    gamepattern.push(randomchosenColor);
    
    $("#" + randomchosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomchosenColor);
    
    
}


function playSound(name){
    var audio = new Audio(name + ".mp3");
    audio.play();
 
}

function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if (gamepattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamepattern.length){
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000); }
  
      } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200); 
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
      }
    
    }
function startOver()
{
  gamepattern=[];
  started = false;
  level = 0;
  
}
