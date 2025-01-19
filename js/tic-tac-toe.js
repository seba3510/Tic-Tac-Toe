function GameBoard() {
	const board = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];

	//======================================================

	const printBoard = function printBoard() {
		const boardDisplay = `
    ${board[0][0]} | ${board[0][1]} | ${board[0][2]}
   -----------
    ${board[1][0]} | ${board[1][1]} | ${board[1][2]}
   -----------
    ${board[2][0]} | ${board[2][1]} | ${board[2][2]}`;

		console.log(boardDisplay);
	}; //printBoard()

	//======================================================

	const resetBoard = function resetBoard() {
		for (let row = 0; row < 3; row++) {
			for (let col = 0; col < 3; col++) {
				board[row][col] = "";
			} //for()
		} //for()
	}; //resetBoard()

	//======================================================

	const getBoard = function getBoard() {
		return board;
	}; //getBoard()

	//======================================================

	return { printBoard, resetBoard, getBoard };
} //GameBoard()

//======================================================

function Player(name, symbol) {
	return { name, symbol };
} //Player()

//======================================================

function Game() {
	const board = GameBoard();
	const boardArr = board.getBoard();
	const player1 = Player("Player 1", "X");
	const player2 = Player("Player 2", "O");
	let currentTurn = player1;

	//==================================================

	const playTurn = function playTurn(player, row, column) {
		displayTurn();

		//prettier-ignore
		if ((boardArr[row][column] === "")) {
			boardArr[row][column] = player.symbol;
			board.printBoard();
		} 

		else {
			const err = "This cell is occupied!";
			throw new Error(err);
		}
		changeTurn();
	}; //playTurn()

	//==================================================

	const changeTurn = function changeTurn() {
		//prettier-ignore
		switch ((currentTurn)) {
			case player1:
				currentTurn = player2;
				break;
			case player2:
				currentTurn = player1;
				break;
			default:
				break;
		} // switch()
	}; //changeTurn()

	//==================================================

	const displayTurn = function displayTurn() {
		const msg = `${currentTurn.name}'s turn`;
		console.log(msg);
	}; //displayTurn()

	//==================================================

	return { board, playTurn, displayTurn };
} //Game()

//==================================================

const player1 = Player("Sebastian", "X");
const player2 = Player("John", "O");

const game = Game();

game.playTurn(player1, 1, 2);

// game.board.printBoard();

game.playTurn(player2, 1, 1);

// game.board.printBoard();

game.playTurn(player1, 0, 2);
