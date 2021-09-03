/*variables*/

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern =[];
var userClickedPattern =[];

var level = 0;
var start = false;

/* dom content loaded and event listener*/

$(document).ready(function() {

    /*keydown to kick start */

    $(document).on("keydown", newStart);

    /*user click and update userclickedpattern*/

    $(".btn").on("click", function(){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
    
        //play sound and effect when button is clicked
        playSound(userChosenColour);
        animatePress(userChosenColour);

        //check answer for every button clicked
        checkAnswer(userClickedPattern.length-1);
    });

    /*user click and reveal path click*/
    $(".path").on("click", function(){
        gamePattern.forEach(function(color, i) {
            setTimeout(function(){
                $("#" + color).fadeOut(150).fadeIn(150); 
                playSound(color);
            }, i * 500)
        });
    });
});

/*control function*/

// record user's highest score
function highestScore(){
    var userScore = localStorage.getItem("userScore");
    var currentScore = localStorage.getItem("currentScore");

    //keep track user's current score
    currentScore++;
    localStorage.setItem("currentScore", currentScore);
    
    // if current score exceed user's record, replace userscore with currentscore
    if(currentScore > userScore){
        localStorage.setItem("userScore", currentScore);
        return $("h2").text("Highest score: " + userScore);
    }

    return $("h2").text("Highest score: " + userScore);
}

//new start of game
function newStart(){
    if(!start){
        nextSequence();
        start = true;
        localStorage.setItem("currentScore", 0)

        // if it's user's first play, create new storage for score
        if(!localStorage.getItem('userScore')){
            localStorage.setItem('userScore', 0);
            $("h2").text("Highest score: " + localStorage.getItem("userScore"));
        
        //else, display user's highest score
        }else{
            $("h2").text("Highest score: " + localStorage.getItem("userScore"));
        }
    }
}


//restart the game
function startOver(){
    level = 0;
    gamePattern =[];
    start = false;
}

//check if user input match game pattern 
function checkAnswer(currentLevel){

    //if userclickedpattern match gamepattern, continue
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){

        //because userclickpattern is set to empty every time when nextsequence is called, 
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(nextSequence,1000);

            //display user's highest record
            highestScore();
            

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

/*helper function*/
      

//generate new sequence
function nextSequence() {

    //reset user pattern to empty array every new sequence for user to reclick all the color from start
    userClickedPattern =[];

    //keep track of level
    level++;
    $("#level-title").text("Level " + level);

    //generate random number between 0 and lenght of coloured button
    var randomNumber = Math.floor(Math.random()*buttonColours.length);
    
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

//generate animation 
function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed");
    }, 100)
}