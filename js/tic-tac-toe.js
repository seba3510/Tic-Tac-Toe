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

function Game(playerOne, playerTwo) {
	const board = GameBoard();
	const boardArr = board.getBoard();

	const players = [
		{
			name: playerOne.name,
			symbol: player1.symbol,
		},

		{
			name: playerTwo.name,
			symbol: player2.symbol,
		},
	];

	let activePlayer = players[0];

	const getActivePlayer = function getActivePlayer() {
		return activePlayer;
	}; //getActivePlayer()

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
		switch ((activePlayer)) {
			case players[0]:
				activePlayer = players[1];
				break;
			case players[1]:
				activePlayer = players[0];
				break;
			default:
				break;
		} // switch()
	}; //changeTurn()

	//==================================================

	const displayTurn = function displayTurn() {
		const msg = `${getActivePlayer().name}'s turn`;
		console.log(msg);
	}; //displayTurn()

	//==================================================

	return { board, playTurn, displayTurn, changeTurn };
} //Game()

//==================================================

const player1 = Player("Sebastian", "X");
const player2 = Player("John", "O");

const game = Game(player1, player2);

game.playTurn(player1, 1, 2);

// game.board.printBoard();

game.playTurn(player2, 1, 1);

// game.board.printBoard();

game.playTurn(player1, 0, 2);

game.playTurn(player2, 0, 2);
