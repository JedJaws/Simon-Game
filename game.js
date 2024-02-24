var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var blue = new Audio("./sounds/blue.mp3");
var green = new Audio("./sounds/green.mp3");
var red = new Audio("./sounds/red.mp3");
var yellow = new Audio("./sounds/yellow.mp3");
var wrong = new Audio("./sounds/wrong.mp3");
var level = 1;


function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    userClickedPattern = [];

    $("#" + randomChosenColor).fadeOut(200).fadeIn(200);
    playSound(randomChosenColor);

    gamePattern.push(randomChosenColor);

    $("h1").text("Level " + level);
    level++;
}


$(".btn").on("click", function () {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(this.id);
    animatePress(this.id);
    checkAnswer();
})

function checkAnswer() {
    if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
        $("h1").text("Game Over! Press A Key to Restart");
    }, 300);
    level = 1;
    gamePattern = [];
    $(document).on("keypress", function (event) {
        if (event.key === 'a' && level === 1) {
            nextSequence();
        }
    })
}

function playSound (name) {
    if (name === "blue"){
        blue.play();
    } else if (name === "red"){
        red.play();
    } else if (name === "green" ){
        green.play();
    } else if (name === "yellow"){
        yellow.play();
    }
}

function animatePress (currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout( function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
 
$(document).on("keypress", function (event) {
    if (event.key === 'a' && level === 1) {
        nextSequence();
    }
})