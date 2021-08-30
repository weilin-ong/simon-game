var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern =[];
var userClickedPattern =[];

var level = 0;
var start = false;

//keydown event to kick start
$(document).on("keydown", function() {
    
    if(!start){
        nextSequence();
        start = true;
    }  
});


$(document).ready(function() {

    //button click event
    $(".btn").on("click", function(){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
    
        //play sound when button is clicked
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    });
});


//check
function checkAnswer(currentLevel){

    //if userclickedpattern match gamepattern, continue
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){

        //because userclickpattern is set to empty every time when nextsequence is called, 
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(nextSequence,1000);
        }

    //if not, inform user game over and restart whole game
    }else{

        // change title
        $("#level-title").text("Game Over, Press Any Key to Restart")

        //alert user with sound and effect
        playSound("wrong");
        
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        //restart
        startOver();
    }  
}

//restart
function startOver(){
    level = 0;
    gamePattern =[];
    start = false;
}
        

//generate new sequence
function nextSequence() {

    //reset user pattern to empty array every new sequence for user to reclick all the color from start
    userClickedPattern =[];

    //keep track of level
    level++;
    $("#level-title").text("Level " + level);

    //generate random number between 0 and 3
    var randomNumber = Math.floor(Math.random()*4);
    
    //generate random colour
    var randomChosenColour =  buttonColours[randomNumber];

    //push random colour
    gamePattern.push(randomChosenColour);

    //flash button with random colour
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    //play sound for when random button is flashed
    playSound(randomChosenColour);
}

//generate sound
function playSound(name){
        //play random audio
        var audio = new Audio("sounds/" + name +".mp3");
        audio.play();
}

//animate button 
function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed");
    }, 100)
}




