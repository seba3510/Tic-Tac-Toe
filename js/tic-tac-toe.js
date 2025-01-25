function GameBoard() {
	const board = [
		["-", "-", "-"],
		["-", "-", "-"],
		["-", "-", "-"],
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
				board[row][col] = "-";
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
	this.name = name;
	this.symbol = symbol;
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
	let previousPlayer;

	let gameOver = false;

	//=========================================================================

	const getActivePlayer = function getActivePlayer() {
		return activePlayer;
	}; //getActivePlayer()

	//=========================================================================

	const playRound = function playRound() {
		//prettier-ignore
		while ((gameOver != true)) {
			displayTurn();
			showPrompt();
			board.printBoard();
			determineWinner();
			console.log(`Is the game over?:  ${gameOver}`);
		} // while
	}; //playTurn()
	//=========================================================================

	const addSymbol = function addSymbol(player, row, column) {
		//prettier-ignore
		if ((boardArr[row][column] === "-")) {
			boardArr[row][column] = player.symbol;
			changeTurn(); 
		}//if 

		else {
			const err = "This cell is occupied!";
			showError(err);
		} //else
	}; //addSymbol()
	//=========================================================================

	const showPrompt = function showPrompt() {
		let row = window.prompt("Enter the row: ");
		let column = window.prompt("Enter the column");
		addSymbol(activePlayer, row, column);
	}; //showPrompt()
	//=========================================================================

	const changeTurn = function changeTurn() {
		//prettier-ignore
		if ((activePlayer === players[0]) &&((gameOver == false))) {
			activePlayer = players[1];
			previousPlayer = players[0];
		} //if

		else if ((activePlayer === players[1]) && (gameOver == false)) {
			activePlayer = players[0];
			previousPlayer = players[1];
		} // else if
	}; //changeTurn()

	//=========================================================================

	const determineWinner = function determineWinner() {
		checkRows();
		checkColumns();
		checkDiagonals();
	}; //determineWinner()

	//=========================================================================
	const checkRows = function checkRows() {
		let n = boardArr.length;

		for (let row = 0; row < n; row++) {
			//prettier-ignore
			if (
				(boardArr[row][0] != "-") &&
				(boardArr[row][0] === boardArr[row][1]) &&
				(boardArr[row][1] === boardArr[row][2])
			) {
				gameOver = true;
				showWinningMsg();
				break;
			} //if
		} //for()
	}; //checkRows()
	//=========================================================================
	const checkColumns = function checkColumns() {
		let n = boardArr.length;
		//prettier-ignore
		for (let col = 0; col < n; col++) {
			if (
				(boardArr[0][col] != "-") &&
				(boardArr[0][col] === boardArr[1][col]) &&
				(boardArr[1][col] === boardArr[2][col])
			) {
				gameOver = true;
				showWinningMsg();
				break;
			} //if
		} //for
	}; //checkColumns()

	//=========================================================================
	const checkDiagonals = function checkDiagonals() {
		//prettier-ignore
		if (
			(boardArr[0][0] != "-") &&
			(boardArr[0][0] === boardArr[1][1]) &&
			(boardArr[1][1] === boardArr[2][2])
		) {
				gameOver = true;
				showWinningMsg();
				return;
				}//if
	
				else if(
					(boardArr[2][0] != "-")&&
					(boardArr[2][0] === boardArr[1][1])&&
					(boardArr[1][1] === boardArr[0][2])
					){
							gameOver = true;
							showWinningMsg();
							return;
				} //else if
	}; //checkDiagonals()
	//=========================================================================

	const showWinningMsg = function showWinningMsg() {
		const msg = `${previousPlayer.name} wins!`;
		console.log(msg);
	}; //showWinningMsg()
	//=========================================================================

	const displayTurn = function displayTurn() {
		const msg = `${getActivePlayer().name}'s turn`;
		console.log(msg);
	}; //displayTurn()

	//=========================================================================

	const showError = function showError(message) {
		console.error(message);
	}; // showError()

	return { playRound };
} //Game()

//=========================================================================

const player1 = Player("Sebastian", "X");
const player2 = Player("John", "O");

const game = Game(player1, player2);
game.playRound();
