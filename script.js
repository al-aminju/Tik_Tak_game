// script.js

// Initialize variables
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let board = Array(9).fill(null);

// Add event listeners to cells
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => makeMove(cell, index));
});

// Handle player moves
function makeMove(cell, index) {
    if (!board[index]) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add('taken');
        if (checkWinner()) {
            alert(`${currentPlayer} wins!`);
            resetGame();
        } else if (board.every(cell => cell)) {
            alert('It\'s a tie!');
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

// Check for winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern => 
        pattern.every(index => board[index] === currentPlayer)
    );
}

// Reset the game
resetButton.addEventListener('click', resetGame);

function resetGame() {
    board.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
    currentPlayer = 'X';
}
