const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var randomChosenColour, randomNumber, colorPressed;
var vidas = 0;
var marcador = 0;
var botonesPresionados = 0;
var newColor = true;
var play = false;
var restart = false;
var secuenciaCorrecta = false;

// ------------------- Event Listeners ---------------------- //

//Interrupciones de color
$('#green').on("click", function(){  
    if(play){
        colorPressed = 'green';
        checkPressedButton(colorPressed);
    }
    else{
        console.log('No se puede jugar mientras se muestra la secuencia');
    }
});

$('#red').on("click", function(){  
    if(play){
        colorPressed = 'red';
        checkPressedButton(colorPressed);
    }
    else{
        console.log('No se puede jugar mientras se muestra la secuencia');
    }
});

$('#blue').on("click", function(){  
    if(play){
        colorPressed = 'blue';
        checkPressedButton(colorPressed);
    }
    else{
        console.log('No se puede jugar mientras se muestra la secuencia');
    }
});

$('#yellow').on("click", function(){
    if(play){
        colorPressed = 'yellow';
        checkPressedButton(colorPressed);
    }
    else{
        console.log('No se puede jugar mientras se muestra la secuencia');
    }
});

//Interrupciones de teclado
$("body").keypress(async function(event){ 
    if ((marcador == 0 || vidas==0) && play==false){
        console.log('Comienza el juego');
        vidas = 3;
        updateScore(true);
        await sleep(375);
        nextSequence(true);
    }
    else{
        console.log('Se presiono tecla');
    }
});

// ------------------- Funciones ---------------------- //
async function nextSequence(newColor){
    play = false;

    if(newColor){
        randomNumber = (Math.floor(Math.random() * 4));
        randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
    }

    updateScore(false);
    console.log(gamePattern);

    for(var i=0; i<gamePattern.length; i++){
        playColor(gamePattern[i]);
        await sleep(1100);
    }

    play = true;
}

function updateScore(iniciarJuego){
    if(iniciarJuego){
        marcador = 0;
        $("#container_score").addClass("score-title");
        $("#level-title").addClass("container-fluid");
        if(restart == false){
            $("h1").after("<h2 id='lifes-remaining-title' class='col-3'>❤️ : " + vidas + "</h2>");
        }
        else{
            $("#restart-title").remove();
            restart = false;
            $("h1").after("<h2 id='lifes-remaining-title' class='col-3'>❤️ : " + vidas + "</h2>");
        }
    }
    else if (secuenciaCorrecta){
        marcador++;
    }
    $("h1").text("Score: " + marcador);
}

function updateLifes(vidas){
    $("#lifes-remaining-title").text("❤️ : " + vidas);
}

function playColor(color){
    makeSound(color);
    $('#' + color).fadeOut().fadeIn();
}

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
 }

function makeSound(color){

    switch (color){

        case "green":
            var greenAudio = new Audio("sounds/green.mp3");
            greenAudio.play();
        break;
        case "red":
            var redAudio = new Audio("sounds/red.mp3");
            redAudio.play();
        break;
        case "blue":
            var blueAudio = new Audio("sounds/blue.mp3");
            blueAudio.play();
        break;
        case "yellow":
            var yellowAudio = new Audio("sounds/yellow.mp3");
            yellowAudio.play();
        break;
        case "wrong":
            var wrongAudio = new Audio("sounds/wrong.mp3");
            wrongAudio.play();
        break;

        default:
            alert("Chispas! Ese boton no tiene audio asignado!");
    }
    
}

async function checkPressedButton(colorPressedF){
    if(colorPressedF == gamePattern[botonesPresionados] && botonesPresionados<(gamePattern.length)-1){
        botonesPresionados++;
        playColor(colorPressedF);
    }
    else if(colorPressedF == gamePattern[botonesPresionados] && botonesPresionados == (gamePattern.length)-1){
        botonesPresionados = 0;
        secuenciaCorrecta = true;
        playColor(colorPressedF);
        updateScore(false);
        await sleep(1200);
        secuenciaCorrecta = false;
        nextSequence(true);
        console.log('Bien hecho!');
        secuenciaCorrecta = false;
    }
    else{
        restart = true;
        botonesPresionados = 0;
        vidas--;
        updateLifes(vidas);
        colorPressedF = 'wrong';
        if (vidas>0){ 
            console.log('Lo siento, te equivocaste!');
            playColor(colorPressedF);
            await sleep(1200);
            nextSequence(false);
        }
        else{
            console.log('Has perdido!');
            play = false;
            $("#container_score").removeClass("score-title");
            $("h1").text("Final Score: " + marcador);
            $("#lifes-remaining-title").remove();
            $("h1").after("<h1 id='restart-title' class='col-6'>Press Any Key to Restart</h1>");
            gamePattern = [];
        }
    }
}