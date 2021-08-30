var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern =[];
var userClickedPattern =[];

var level = 0;
var start = false;

/* dom content loaded and event listener*/

$(document).ready(function() {

    /*keydown or click to kick start based on screen size*/

    //smaller or equal to tablet size
    if(window.matchMedia("(max-width:728px)").matches){
        $("h1").html("<button class='tablet'>Start game</button>");
        $(".tablet").on("click", newStart);

    //larger than tablet size
    }else{
        $(document).on("keydown", newStart);
    }

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

//new start of game
function newStart(){
    if(!start){
        nextSequence();
        start = true;
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

//animate button 
function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed");
    }, 100)
}