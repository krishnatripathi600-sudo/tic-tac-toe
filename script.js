// ================================
// Tic Tac Toe AI
// Part 1
// ================================


// HTML Elements

const board = document.getElementById("board");
const status = document.getElementById("status");
const mode = document.getElementById("gameMode");
const restartBtn = document.getElementById("restartBtn");


// Game Board

let gameBoard = [
    "", "", "",
    "", "", "",
    "", "", ""
];


// Current Player

let currentPlayer = "X";


// Game Over

let gameOver = false;


// Store all cells

let cells = [];


// Winning Patterns

const winPatterns = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]

];


// ================================
// Create Board
// ================================

function createBoard(){

    board.innerHTML="";

    cells=[];

    for(let i=0;i<9;i++){

        const cell=document.createElement("div");

        cell.classList.add("cell");

        cell.dataset.index=i;

        cell.addEventListener("click",playerMove);

        board.appendChild(cell);

        cells.push(cell);

    }

}

createBoard();


// ================================
// Restart Game
// ================================

function restartGame(){

    gameBoard=[

        "","","",

        "","","",

        "","",""

    ];

    currentPlayer="X";

    gameOver=false;

    createBoard();

    if(mode.value==="ai"){

        status.innerHTML="Your Turn (X)";

    }

    else{

        status.innerHTML="Player X Turn";

    }

}

restartBtn.addEventListener("click",restartGame);

mode.addEventListener("change",restartGame);




// ================================
// Player Click
// ================================

function playerMove(){

    if(gameOver)
        return;

    const index=parseInt(this.dataset.index);

    if(gameBoard[index]!="")
        return;

    // Multiplayer Mode

    if(mode.value==="player"){

        gameBoard[index]=currentPlayer;

        cells[index].innerHTML=currentPlayer;

        if(checkWinner(currentPlayer)){

            status.innerHTML=

            "Player "+currentPlayer+" Wins!";

            gameOver=true;

            return;

        }

        if(checkDraw()){

            status.innerHTML="Draw!";

            gameOver=true;

            return;

        }

        currentPlayer=

        currentPlayer==="X" ? "O" : "X";

        status.innerHTML=

        "Player "+currentPlayer+" Turn";

    }

    // AI Mode

    else{

        gameBoard[index]="X";

        cells[index].innerHTML="X";

        if(checkWinner("X")){

            status.innerHTML="You Win!";

            gameOver=true;

            return;

        }

        if(checkDraw()){

            status.innerHTML="Draw!";

            gameOver=true;

            return;

        }

        status.innerHTML="Computer Thinking...";

        setTimeout(computerMove,300);

    }

}
// ======================================
// Check Winner
// ======================================

function checkWinner(player){

    for(let pattern of winPatterns){

        let a = pattern[0];
        let b = pattern[1];
        let c = pattern[2];

        if(

            gameBoard[a] === player &&
            gameBoard[b] === player &&
            gameBoard[c] === player

        ){

            return true;

        }

    }

    return false;

}



// ======================================
// Check Draw
// ======================================

function checkDraw(){

    for(let cell of gameBoard){

        if(cell==="")
            return false;

    }

    return true;

}



// ======================================
// Computer Move
// ======================================

function computerMove(){

    if(gameOver)
        return;

    let bestScore = -Infinity;

    let bestMove = -1;

    for(let i=0;i<9;i++){

        if(gameBoard[i]===""){

            gameBoard[i]="O";

            let score=minimax(gameBoard,false);

            gameBoard[i]="";

            if(score>bestScore){

                bestScore=score;

                bestMove=i;

            }

        }

    }

    gameBoard[bestMove]="O";

    cells[bestMove].innerHTML="O";



    if(checkWinner("O")){

        status.innerHTML="Computer Wins!";

        gameOver=true;

        return;

    }



    if(checkDraw()){

        status.innerHTML="Draw!";

        gameOver=true;

        return;

    }



    status.innerHTML="Your Turn (X)";

}
// ======================================
// Minimax Algorithm
// ======================================

function minimax(boardState, isMaximizing){

    // Computer Wins

    if(checkWinnerBoard(boardState,"O"))
        return 1;

    // Human Wins

    if(checkWinnerBoard(boardState,"X"))
        return -1;

    // Draw

    if(checkDrawBoard(boardState))
        return 0;



    // Computer Turn

    if(isMaximizing){

        let bestScore = -Infinity;

        for(let i=0;i<9;i++){

            if(boardState[i] === ""){

                boardState[i] = "O";

                let score = minimax(boardState,false);

                boardState[i] = "";

                bestScore = Math.max(score,bestScore);

            }

        }

        return bestScore;

    }



    // Human Turn

    else{

        let bestScore = Infinity;

        for(let i=0;i<9;i++){

            if(boardState[i] === ""){

                boardState[i] = "X";

                let score = minimax(boardState,true);

                boardState[i] = "";

                bestScore = Math.min(score,bestScore);

            }

        }

        return bestScore;

    }

}



// ======================================
// Winner Check for Minimax
// ======================================

function checkWinnerBoard(boardState,player){

    for(let pattern of winPatterns){

        const [a,b,c] = pattern;

        if(

            boardState[a] === player &&

            boardState[b] === player &&

            boardState[c] === player

        ){

            return true;

        }

    }

    return false;

}



// ======================================
// Draw Check for Minimax
// ======================================

function checkDrawBoard(boardState){

    for(let i=0;i<9;i++){

        if(boardState[i] === "")
            return false;

    }

    return true;

}