const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const startButton = document.querySelector('.startButton');

let lastHole;
let timeUp = false;
// 20000 milliseconds
let timeLimit = 20000;
let score = 0;
let countdown;

function pickRandomHole(holes) {
    const randomHole = Math.floor(Math.random() * holes.length);
    const hole = holes[randomHole];
    if (hole === lastHole) {
        return pickRandomHole(holes);
    }

    lastHole = hole;
    return hole;
}

function popOut() {
    // Time between 400 ms and 1700 ms
    const time = Math.random() * 1300 + 400;
    const hole = pickRandomHole(holes);
    hole.classList.add('up');
    setTimeout(function() {
        hole.classList.remove('up');
        if (!timeUp) popOut();   
    }, time)
}


function startGame() {
    countdown = timeLimit/1000;
    scoreBoard.textContent = 0;
    // Makes the scoreBoard invisible before starting the game
    scoreBoard.style.display = 'block';
    countdownBoard.textContent = countdown;
    timeUp = false;
    score = 0;
    popOut();
    setTimeout(function(){
        timeUp = true;
    }, timeLimit);

    let startCountdown = setInterval(function(){
        countdown -=1;
        countdownBoard.textContent = countdown;
        if (countdown < 0) {
            countdown = 0;
            //With clearInterval, you pass in a reference of the interval you want to clear
            clearInterval(startCountdown);
            countdownBoard.textContent = 'Times UP!!' 
            'Thank you for protecting our planet! This is the way!';
        }
    }, 1000);
}

startButton.addEventListener('click', startGame);

function whack(e){
    score++;
    this.style.backgroundImage = 'url("images/yoda2.png")';
    //Prevent multiple clicks at once on the same yoda
    this.style.pointerEvents = 'none';
    setTimeout(() => {
        this.style.backgroundImage = 'url("images/yoda1.png")';
        this.style.pointerEvents = 'all';
    }, 800);
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', whack));
