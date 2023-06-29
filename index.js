var colors=["green","red","yellow","blue"];
var gamePatterns=[];
var userClickedPattern = [];
var starting = true;
var level=0;
$(document).keypress(function(event){
    if(starting==true){
        $("#level-title").text("Level "+level);
        nextSequence();
        starting=false;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length -1);
});
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePatterns[currentLevel]){
      if(userClickedPattern.length===gamePatterns.length){
        setTimeout(function(){
            nextSequence();
        },1000);
      }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function nextSequence() {
    userClickedPattern=[];
    level=level+1;
    $("#level-title").text("Level " + level);
    var number = Math.floor(Math.random()*4);
    var randomColorChoosen=colors[number];
    gamePatterns.push(randomColorChoosen);
    $("#" + randomColorChoosen).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColorChoosen);
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {$("#" + currentColor).removeClass("pressed");}, 100);
  }




function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3")
    audio.play();
}
function startOver(){
    level=0;
    gamePatterns=[];
    starting =true;
}