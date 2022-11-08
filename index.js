var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];

var lvl=0;
var started=false;

$(document).keypress(function(){
    if(!started){
        $("h1").text("Level"+lvl);
        nextSequence();
        started=true;
    }
})

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLvl){
    if(gamePattern[currentLvl]===userClickedPattern[currentLvl]){
        console.log("success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function nextSequence(){
    userClickedPattern=[];
    lvl++;
    $("h1").text("Level "+lvl);


    var randomNumber= Math.floor((Math.random()*4));
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function startOver(){
    started=false;
    gamePattern=[];
    lvl=0;
}
