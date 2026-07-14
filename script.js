const cells = Array.from(document.querySelectorAll(".Container button"));
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

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

function updateStatus(message) {
	statusText.textContent = message;
}

function checkWinner() {
	for (const combo of winningCombinations) {
		const [a, b, c] = combo;

		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			return board[a];
		}
	}

	return null;
}

function handleCellClick(event) {
	const cell = event.target;
	const cellIndex = Number(cell.id) - 1;

	if (!isGameActive || board[cellIndex]) {
		return;
	}

	board[cellIndex] = currentPlayer;
	cell.textContent = currentPlayer;

	const winner = checkWinner();

	if (winner) {
		updateStatus("Gana " + winner + "!");
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

	cells.forEach((cell) => {
		cell.textContent = "";
	});

	updateStatus("Turno de " + currentPlayer);
}

cells.forEach((cell) => {
	cell.addEventListener("click", handleCellClick);
});

resetButton.addEventListener("click", resetGame);

updateStatus("Turno de " + currentPlayer);
