const ROWS = 20;
const COLS = 10;

const boardElement = document.getElementById("board");

let board;
let currentPiece;

let score = 0;
let level = 1;

let gameInterval;

const pieces = {

    I: [
        [1, 1, 1, 1]
    ],

    J: [
        [1, 0, 0],
        [1, 1, 1]
    ],

    L: [
        [0, 0, 1],
        [1, 1, 1]
    ],

    O: [
        [1, 1],
        [1, 1]
    ],

    S: [
        [0, 1, 1],
        [1, 1, 0]
    ],

    T: [
        [0, 1, 0],
        [1, 1, 1]
    ],

    Z: [
        [1, 1, 0],
        [0, 1, 1]
    ]
};



function createBoard() {

    board = Array.from(
        { length: ROWS },
        () => Array(COLS).fill(null)
    );

}


/* Dibujar tablero */

function drawBoard() {

    boardElement.innerHTML = "";

    for (let row = 0; row < ROWS; row++) {

        for (let col = 0; col < COLS; col++) {

            const cell = document.createElement("div");

            cell.classList.add("cell");

            if (board[row][col]) {
                cell.classList.add(board[row][col]);
            }

            boardElement.appendChild(cell);

        }

    }

}


/* Crear pieza */

function createPiece() {

    const types = Object.keys(pieces);

    const type =
        types[Math.floor(Math.random() * types.length)];

    return {

        type: type,

        shape: pieces[type].map(row => [...row]),

        row: 0,

        col: Math.floor(
            COLS / 2 -
            pieces[type][0].length / 2
        )

    };

}


/* Dibujar pieza */

function drawPiece() {

    currentPiece.shape.forEach((row, r) => {

        row.forEach((value, c) => {

            if (value) {

                const index =
                    (currentPiece.row + r) * COLS +
                    (currentPiece.col + c);

                if (index >= 0) {

                    const cell =
                        boardElement.children[index];

                    cell.classList.add(
                        currentPiece.type
                    );

                }

            }

        });

    });

}


/* Colisión */

function collision() {

    for (
        let r = 0;
        r < currentPiece.shape.length;
        r++
    ) {

        for (
            let c = 0;
            c < currentPiece.shape[r].length;
            c++
        ) {

            if (!currentPiece.shape[r][c])
                continue;

            const newRow =
                currentPiece.row + r;

            const newCol =
                currentPiece.col + c;

            if (
                newCol < 0 ||
                newCol >= COLS ||
                newRow >= ROWS
            ) {
                return true;
            }

            if (
                newRow >= 0 &&
                board[newRow][newCol]
            ) {
                return true;
            }

        }

    }

    return false;
}


/* Fijar pieza */

function mergePiece() {

    currentPiece.shape.forEach((row, r) => {

        row.forEach((value, c) => {

            if (value) {

                board[
                    currentPiece.row + r
                ][
                    currentPiece.col + c
                ] = currentPiece.type;

            }

        });

    });

}


/* Eliminar líneas */

function clearLines() {

    let lines = 0;

    for (let row = ROWS - 1; row >= 0; row--) {

        if (board[row].every(cell => cell)) {

            board.splice(row, 1);

            board.unshift(
                Array(COLS).fill(null)
            );

            lines++;

            row++;

        }

    }

    if (lines > 0) {

        score += lines * 100;

        level =
            Math.floor(score / 500) + 1;

        document.getElementById("score")
            .textContent = score;

        document.getElementById("level")
            .textContent = level;

        updateSpeed();
    }

}


/* Bajar pieza */

function drop() {

    currentPiece.row++;

    if (collision()) {

        currentPiece.row--;

        mergePiece();

        clearLines();

        currentPiece = createPiece();

        if (collision()) {

            gameOver();

        }

    }

    drawBoard();

    drawPiece();

}


/* Mover */

function move(direction) {

    currentPiece.col += direction;

    if (collision()) {

        currentPiece.col -= direction;

    }

    drawBoard();
    drawPiece();

}


/* Rotar */

function rotate() {

    const oldShape =
        currentPiece.shape;

    const newShape =
        oldShape[0].map(
            (_, index) =>
                oldShape.map(
                    row => row[index]
                ).reverse()
        );

    currentPiece.shape = newShape;

    if (collision()) {

        currentPiece.shape = oldShape;

    }

    drawBoard();
    drawPiece();

}


/* Caer directamente */

function hardDrop() {

    while (!collision()) {

        currentPiece.row++;

    }

    currentPiece.row--;

    drop();

}


/* Controles */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "ArrowLeft") {

            move(-1);

        }

        else if (event.key === "ArrowRight") {

            move(1);

        }

        else if (event.key === "ArrowDown") {

            drop();

        }

        else if (event.key === "ArrowUp") {

            rotate();

        }

        else if (event.code === "Space") {

            hardDrop();

        }

    }
);


/* Velocidad */

function updateSpeed() {

    clearInterval(gameInterval);

    const speed =
        Math.max(
            100,
            700 - (level - 1) * 60
        );

    gameInterval =
        setInterval(drop, speed);

}


/* Game Over */

function gameOver() {

    clearInterval(gameInterval);

    setTimeout(() => {

        alert(
            "Game Over\nPuntuación: " + score
        );

    }, 100);

}


/* Reiniciar */

function restartGame() {

    score = 0;
    level = 1;

    document.getElementById("score")
        .textContent = score;

    document.getElementById("level")
        .textContent = level;

    createBoard();

    currentPiece = createPiece();

    updateSpeed();

    drawBoard();

    drawPiece();

}


/* Iniciar */

restartGame();