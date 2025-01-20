function GameBoard() {
	const board = [
		[null, null, null],
		[null, null, null],
		[null, null, null],
	];

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

	//=========================================================================

	const resetBoard = function resetBoard() {
		for (let row = 0; row < 3; row++) {
			for (let col = 0; col < 3; col++) {
				board[row][col] = null;
			} //for()
		} //for()
	}; //resetBoard()

	//=========================================================================

	const getBoard = function getBoard() {
		return board;
	}; //getBoard()

	//=========================================================================

	return { printBoard, resetBoard, getBoard };
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
		} // while()
		console.log("The board is full!");
		// determineWinner();
	}; //playTurn()

	const addSymbol = function addSymbol(player, row, column) {
		//prettier-ignore
		if ((boardArr[row][column] === null)) {
			boardArr[row][column] = player.symbol;
			changeTurn();

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
		let n = boardArr.length;
		let result = false;
		for (let row = 0; row < n; row++) {
			for (let col = 0; col < n; col++) {
				let elem = boardArr[row][col];

				//prettier-ignore
				if ((elem != null)) {
					result = true;
					continue;
				} //if()

				result = false;
			} //for()
		} //for()
		return result;
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
		const winCombinations = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],

			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],

			[0, 4, 8],
			[2, 4, 6],
		];
		let n = winCombinations.length;
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
