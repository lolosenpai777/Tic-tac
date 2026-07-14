const cells = Array.from(document.querySelectorAll(".Container button"));
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
const gameContainer = document.querySelector(".Container");
const winningLine = document.getElementById("winning-line");

const winningCombinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

let board = Array(9).fill("");
let currentPlayer = "X";
let isGameActive = true;
let lastWinningCombo = null;

function updateStatus(message) {
	statusText.textContent = message;
}

function checkWinner() {
	for (const combo of winningCombinations) {
		const [a, b, c] = combo;

		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			return combo;
		}
	}

	return null;
}

function clearWinningLine() {
	winningLine.style.display = "none";
	winningLine.style.width = "0";
	winningLine.style.transform = "none";
	lastWinningCombo = null;
}

function showWinningLine(combo) {
	const startCell = cells[combo[0]];
	const endCell = cells[combo[2]];
	const containerRect = gameContainer.getBoundingClientRect();
	const startRect = startCell.getBoundingClientRect();
	const endRect = endCell.getBoundingClientRect();

	const startX = startRect.left + startRect.width / 2 - containerRect.left;
	const startY = startRect.top + startRect.height / 2 - containerRect.top;
	const endX = endRect.left + endRect.width / 2 - containerRect.left;
	const endY = endRect.top + endRect.height / 2 - containerRect.top;
	const length = Math.hypot(endX - startX, endY - startY);
	const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

	winningLine.style.left = `${startX}px`;
	winningLine.style.top = `${startY - 4}px`;
	winningLine.style.width = `${length}px`;
	winningLine.style.transform = `rotate(${angle}deg)`;
	winningLine.style.display = "block";
	lastWinningCombo = combo;
}

function handleCellClick(event) {
	const cell = event.target;
	const cellIndex = Number(cell.id) - 1;

	if (!isGameActive || board[cellIndex]) {
		return;
	}

	board[cellIndex] = currentPlayer;
	cell.textContent = currentPlayer;

	const winningCombo = checkWinner();

	if (winningCombo) {
		updateStatus("Gana " + board[winningCombo[0]] + "!");
		showWinningLine(winningCombo);
		isGameActive = false;
		return;
	}

	if (!board.includes("")) {
		updateStatus("Empate");
		isGameActive = false;
		return;
	}

	currentPlayer = currentPlayer === "X" ? "O" : "X";
	updateStatus("Turno de " + currentPlayer);
}

function resetGame() {
	board = Array(9).fill("");
	currentPlayer = "X";
	isGameActive = true;
	clearWinningLine();

	cells.forEach((cell) => {
		cell.textContent = "";
	});

	updateStatus("Turno de " + currentPlayer);
}

cells.forEach((cell) => {
	cell.addEventListener("click", handleCellClick);
});

window.addEventListener("resize", () => {
	if (lastWinningCombo) {
		showWinningLine(lastWinningCombo);
	}
});

resetButton.addEventListener("click", resetGame);

updateStatus("Turno de " + currentPlayer);
