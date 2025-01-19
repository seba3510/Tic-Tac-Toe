function GameBoard() {
	const board = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];

	let sizeCounter = 0;

	//=========================================================================

	const printBoard = function printBoard() {
		const boardDisplay = `
    ${board[0][0]} | ${board[0][1]} | ${board[0][2]}
   -----------
    ${board[1][0]} | ${board[1][1]} | ${board[1][2]}
   -----------
    ${board[2][0]} | ${board[2][1]} | ${board[2][2]}`;

		console.log(boardDisplay);
	}; //printBoard()

	const getSize = function getSize() {
		return sizeCounter;
	}; // getSize()

	//=========================================================================

	const resetBoard = function resetBoard() {
		for (let row = 0; row < 3; row++) {
			for (let col = 0; col < 3; col++) {
				board[row][col] = "";
			} //for()
		} //for()
		sizeCounter = 0;
	}; //resetBoard()

	//=========================================================================

	const getBoard = function getBoard() {
		return board;
	}; //getBoard()

	//=========================================================================

	return { printBoard, resetBoard, getBoard, getSize };
} //GameBoard()

//=========================================================================
function Player(name, symbol) {
	return { name, symbol };
} //Player()

//=========================================================================

function Game(playerOne, playerTwo) {
	const board = GameBoard();
	const boardArr = board.getBoard();

	const players = [
		{
			name: playerOne.name,
			symbol: playerOne.symbol,
		},

		{
			name: playerTwo.name,
			symbol: playerTwo.symbol,
		},
	];

	let activePlayer = players[0];

	//=========================================================================

	const getActivePlayer = function getActivePlayer() {
		return activePlayer;
	}; //getActivePlayer()

	//=========================================================================

	const playRound = function playRound(row, col) {
		// //prettier-ignore
		// displayTurn();

		// //prettier-ignore
		// if ((boardArr[row][column] === "")) {
		// 		boardArr[row][column] = player.symbol;
		// 		board.printBoard();
		// 	}

		// 	else {
		// 		const err = "This cell is occupied!";
		// 		throw new Error(err);
		// 	}
		// changeTurn();

		//prettier-ignore
		while ((!isFull())) {
			displayTurn();
			board.printBoard();
			showPrompt();
			console.log(sizeCounter);
		} // while()
		determineWinner();
	}; //playTurn()

	const addSymbol = function addSymbol(player, row, column) {
		//prettier-ignore
		if ((boardArr[row][column] === "")) {
			boardArr[row][column] = player.symbol;
			changeTurn();
			sizeCounter++;
		}//if 

		else {
			const err = "This cell is occupied!";
			console.error(err);
		} //else
	}; //addSymbol()

	const showPrompt = function showPrompt() {
		let row = window.prompt("Enter the row: ");
		let column = window.prompt("Enter the column");
		addSymbol(activePlayer, row, column);
	}; //showPrompt()

	const isFull = function isFull() {
		return board.getSize() === 9;
	}; //isFull()

	//=========================================================================

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

	//=========================================================================

	const determineWinner = function determineWinner() {
		const winCombinations = [[0, 1, 2], []];
	}; //determineWinner()

	//=========================================================================

	const displayTurn = function displayTurn() {
		const msg = `${getActivePlayer().name}'s turn`;
		console.log(msg);
	}; //displayTurn()

	//=========================================================================

	return { playRound, displayTurn, changeTurn, isFull };
} //Game()

//=========================================================================

const player1 = Player("Sebastian", "X");
const player2 = Player("John", "O");

const game = Game(player1, player2);
game.playRound();
