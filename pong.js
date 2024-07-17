const gameboard = document.getElementById("gameboard");
const cpucheck = document.getElementById("cpucheck");
const ctx = gameboard.getContext("2d");
const STATE = {STARTUP: 0, PLAYING: 1, GAMEOVER: 2}

let state = STATE.STARTUP

let boardWidth = 500;
let boardHeight = 500;
let paddleWidth = 25;
let paddleLength = 100;
let ballRadius = 12.5;
let paddleVelocity = 5;
let paddleForce = 1.1; // 110%

let ball;
let paddleL;
let paddleR;
let scoreL = 0;
let scoreR = 0;

function clearBoard() {
    ctx.fillStyle = "gray"
    ctx.fillRect(0, 0, boardWidth, boardHeight)
}

function draw() {
    clearBoard()
    ball.draw(ctx);
    paddleL.draw(ctx);
    paddleR.draw(ctx);
}

function resetGame() {
    state = STATE.STARTUP
    scoreL = 0
    scoreR = 0
    updateScore()
    clearInterval(intervalID)
    resetBall()
    paddleL = new Paddle(0, 0, paddleLength, paddleWidth, SIDE.LEFT, "white")
    paddleR = new Paddle(boardWidth-paddleWidth, 0, paddleLength, paddleWidth, SIDE.RIGHT, "white")
    nextTick()
}

function resetBall() {
    ball = new Ball(boardWidth/2, boardHeight/2, 1, -1, ballRadius, "yellow")
}

let intervalID
function nextTick() {
    switch (state) {
        case STATE.STARTUP:
            state = STATE.PLAYING
            break;
        case STATE.PLAYING:
            state = play()
            break;
        case STATE.GAMEOVER:
            state = STATE.GAMEOVER
            break;
        default:
            state = STATE.STARTUP
            break;
    }
    draw()
    intervalID = setTimeout(nextTick, 6.9444444)
}

function play() {
    paddleL.move(false, ball)
    paddleR.move(true, ball)
    let scoreSide = ball.bounce([paddleL, paddleR])
    if (scoreSide != SIDE.NONE) {
        if (scoreSide == SIDE.LEFT) scoreL++
        if (scoreSide == SIDE.RIGHT) scoreR++
        updateScore()
        resetBall()
        if (scoreL >= 10 || scoreR >= 10) return STATE.GAMEOVER;
    }
    ball.move()
    // Add serving the ball?
    // If a player wins, stop the game...
    return STATE.PLAYING;
}

function updateScore() {
    const scoreboard = document.getElementById("scoreboard")
    scoreboard.innerHTML = `${scoreL} : ${scoreR}` // 7 : 4
}