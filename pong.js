const gameboard = document.getElementById("gameboard");
const cpucheck = document.getElementById("cpucheck");
const ctx = gameboard.getContext("2d");
const STATE = {STARTUP: 0, PLAYING: 1, GAMEOVER: 2, SERVING: 3}

let state = STATE.STARTUP;

let boardWidth = 500;
let boardHeight = 500;
let paddleWidth = 20;
let paddleLength = 100;
let ballRadius = 10;
let paddleVelocity = 5;
let paddleForce = 1.1; // 110%

let upgrade;
let ball;
let paddleL;
let paddleR;
let scoreL = 0;
let scoreR = 0;

function clearBoard() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, boardWidth, boardHeight)
}

function draw() {
    clearBoard();
    ball.draw(ctx);
    paddleL.draw(ctx);
    paddleR.draw(ctx);
}

function resetGame() {
    state = STATE.STARTUP
    scoreL = 0;
    scoreR = 0;
    updateScore();
    clearInterval(intervalID);
    paddleL = new Paddle(0, 0, paddleLength, paddleWidth, SIDE.LEFT, "#7dfdfe")
    paddleR = new Paddle(boardWidth-paddleWidth, 0, paddleLength, paddleWidth, SIDE.RIGHT, "#ff7d7d")
    resetBall();
    upgrade = new Upgrade(0, 0)
    nextTick();
}

function resetBall() {
    ball = new Ball(boardWidth/2, boardHeight/2, 0, 0, ballRadius, "#ffffff")
    state = STATE.SERVING;
    console.log(state)
}

function showPopupMessage(message) {
    const popupMessage = document.getElementById('popupMessage');
    popupMessage.innerText = message;
    popupMessage.style.display = 'block';
    setTimeout(() => {
        popupMessage.style.display = 'none';
        if (scoreL < 10 && scoreR < 10) resetBall();
    }, 500);
}

let intervalID
function nextTick() {
    switch (state) {
        case STATE.STARTUP:
            state = STATE.PLAYING;
            break;
        case STATE.PLAYING:
            state = play();
            break;
        case STATE.GAMEOVER:
            state = STATE.GAMEOVER;
            break;
        case STATE.SERVING:
            state = serve();
            break;
        default:
            state = STATE.STARTUP;
            break;
    }
    draw();
    intervalID = setTimeout(nextTick, 6.9444444);
}

function serve() {
    // if (isSpacebarDown) {
        // const directionX = Math.random() * 2 - 1
        // const directionY = Math.random() * 2 - 1
        ball.vx = -1 // directionX * 2; 
        ball.vy = Math.random() * 2 - 1 // directionY * 2;
        return STATE.PLAYING
    // }
    // return STATE.SERVING
}

function play() {
    const isCPUEnabled =  cpucheck.checked; 
    paddleL.move(false, ball);
    paddleR.move(isCPUEnabled, ball);
    let scoreSide = ball.bounce([paddleL, paddleR])
    if (scoreSide != SIDE.NONE) {
        if (scoreSide == SIDE.LEFT) { 
            scoreL++
            showPopupMessage("Left player scores!");
        }
        if (scoreSide == SIDE.RIGHT) { 
            scoreR++
            showPopupMessage("Right player scores!");
        }
        updateScore();
        if (paddleL.hasUpgrade == true) upgrade.removeUpgrade(paddleL)
        if (paddleR.hasUpgrade == true) upgrade.removeUpgrade(paddleR)
        upgrade.randomUpgrade(scoreSide); //Random Chance
        resetBall();
        if (scoreL >= 10 || scoreR >= 10) return STATE.GAMEOVER;
        return STATE.SERVING;
    }
    ball.move();
    // Add serving the ball?
    return STATE.PLAYING;
}

function updateScore() {
    const scoreboard = document.getElementById("scoreboard")
    scoreboard.innerHTML = `${scoreL} : ${scoreR}`; // 7 : 4
    if (scoreL >= 10 || scoreR >= 10) {
        if (scoreL >= 10) scoreboard.innerHTML = `&#128200 WIN : ${scoreR}`
        if (scoreR >= 10) scoreboard.innerHTML = `${scoreL} : WIN &#128200`
    }
}