const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winning-message');
const restartButton = document.getElementById('restartButton');
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let circleTurn;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('circle');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessageElement.style.display = 'none';
    winningMessageElement.innerText = '';
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? 'circle' : 'x';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageElement.innerText = 'Draw!';
    } else {
        winningMessageElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    }
    winningMessageElement.style.display = 'block';
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove('x');
    board.classList.remove('circle');
    if (circleTurn) {
        board.classList.add('circle');
    } else {
        board.classList.add('x');
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}