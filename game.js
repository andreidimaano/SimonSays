var gamePattern = [];
var userClickedPattern =[];
var buttonColours = ["red","blue","green","yellow"];
var level = 0;
var started = false;

$(document).on("keypress", function() {
    // $("h1").html("Level 0");
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$("#level-title.mobiletap").on("click",function(){
    startTheGame();
});

$(".btn").click(function() {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
 
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    console.log(gamePattern.length);

    var i = 0;
    
    timerFunction = function() {
        $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(gamePattern[i]);
        i = i +=1;

        //repeats call
        if(i < gamePattern.length) {
            setTimeout(timerFunction, 500);
        };
    };

    //first call
    setTimeout(timerFunction, 500);
}



function animatePress(currentColor) {
    var button = $("#" + currentColor);
    button.addClass("pressed");
    setTimeout(function() {
        button.removeClass("pressed");
    }, 100);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

