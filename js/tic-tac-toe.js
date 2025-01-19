function GameBoard() {
	const board = [
		["X", "O", "X"],
		["X", "X", "X"],
		["X", "O", "X"],
	];

	const printBoard = function printBoard() {

		const boardDisplay = `
    ${board[0][0]} | ${board[0][1]} | ${board[0][2]}
   -----------
    ${board[1][0]} | ${board[1][1]} | ${board[1][2]}
   -----------
    ${board[2][0]} | ${board[2][1]} | ${board[2][2]}`;

		console.log(boardDisplay);
	}; //printBoard()

	const resetBoard = function resetBoard() {
		for (let row = 0; row < 3; row++) {
			for (let col = 0; col < 3; col++) {
				board[row][col] = "";
			} //for()
		} //for()
	}; //resetBoard()

	const getBoard = function getBoard() {
		return board;
	}; //getBoard()

	return { printBoard, resetBoard, getBoard };
} //GameBoard()

const board = GameBoard();

board.printBoard();

board.resetBoard();

board.printBoard();
