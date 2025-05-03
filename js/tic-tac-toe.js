function GameBoard() {

	const board =
		[
			["-", "-", "-"],
			["-", "-", "-"],
			["-", "-", "-"],
		];

	let numSymbols = 0;

	const gridContainerElem =
		document.querySelector("#grid-container");

	//=========================================================================

	const displayBoard =
		function displayBoard() {


			do {

				gridContainerElem.removeChild(gridContainerElem.firstChild);

			} while ((gridContainerElem.firstChild));

			const n = 3;

			for (let row = 0; row < n; row++) {

				for (let col = 0; col < n; col++) {

					const div =
						document.createElement("div");

					div.append(board[row][col]);

					gridContainerElem.appendChild(div);

				} // for

			} // for

		} // displayBoard()

	//=========================================================================

	const resetBoard =
		function resetBoard() {

			for (let row = 0; row < 3; row++) {

				for (let col = 0; col < 3; col++) {

					board[row][col] =
						"-";

				} // for

			} // for

		} // resetBoard()

	//=========================================================================

	const getBoard =
		function getBoard() {

			return board;

		} // getBoard()

	//=========================================================================

	return {

		displayBoard,
		resetBoard,
		getBoard,
		numSymbols,
		gridContainerElem
	};

} // GameBoard()

//=========================================================================

function Player(name, symbol) {

	this.name =
		name;

	this.symbol =
		symbol;

	return {
		name,
		symbol
	};

} // Player()

//=========================================================================

function Game() {

	const board =
		GameBoard();

	const boardArr =
		board.getBoard();

	const dialogBoxElem =
		document.querySelector("dialog");

	const startGameBtnElem =
		document.querySelector("#start-game-btn");

	const playerOneNameElem =
		document.querySelector("#player-one-name");

	const playerTwoNameElem =
		document.querySelector("#player-two-name");

	const formElem =
		document.querySelector("form");

	const playerOne =
		Player("", "X");

	const playerTwo =
		Player("", "O");

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

	let activePlayer =
		players[0];

	let previousPlayer;

	let gameOver =
		false;

	//=========================================================================

	const getActivePlayer =
		function getActivePlayer() {

			return activePlayer;

		} //getActivePlayer()

	//=========================================================================

	//=========================================================================

	const closeDialogBox =
		function closeDialogBox() {

			const closeDialogBoxBtn =
				document.querySelector("#close-dialog-btn");

			closeDialogBoxBtn.addEventListener("click", () => {


				playerOneNameElem.value = "";

				playerTwoNameElem.value = "";

				dialogBoxElem.close();
			});

		} // closeDialogBox()


	//=========================================================================

	const saveNamesBtnClick =
		function saveNamesBtnClick() {

			dialogBoxElem.showModal();

			const saveNamesBtn =
				document.querySelector("#save-names-btn");

			saveNamesBtn.addEventListener("click", () => {

				const playerOneName =
					playerOneNameElem.value.trim();

				players[0].name =
					playerOneName;

				const playerTwoName =
					playerTwoNameElem.value.trim();

				players[1].name =
					playerTwoName;

				dialogBoxElem.close();

				playRound();

				playerOneNameElem.value = "";

				playerTwoNameElem.value = "";


			});




		} // saveNamesBtnClick()

	//=========================================================================

	const startGameBtnClick =
		function startGameBtnClick() {

			startGameBtnElem.addEventListener("click", (event) => {


				saveNamesBtnClick();


			}); // addEventListener()


		} // startGameBtnClick()

	//=========================================================================

	const playRound =
		function playRound() {

			board.numSymbols = 0;

			while (!gameOver) {

				console.log(`Number of Symbols: ${board.numSymbols}`);

				console.log(`Is the game over?:  ${gameOver}`);

				displayTurn();

				showPrompt();

				board.displayBoard();

				determineWinner();

			} // while

			board.resetBoard();

		} // playRound()

	//=========================================================================

	const addSymbol =
		function addSymbol
			(
				player,
				row,
				column
			) {

			let isCellEmpty =
				boardArr[row][column]
				=== "-";

			if (isCellEmpty) {

				boardArr[row][column] =
					player.symbol;

				board.numSymbols++;

				changeTurn();

			} // if

			else {

				const err =
					"This cell is occupied!";

				showError(err);

			} // else

		} // addSymbol()

	//=========================================================================

	const showPrompt =
		function showPrompt() {

			let row =
				window.prompt("Enter the row");

			let column =
				window.prompt("Enter the column");

			addSymbol
				(
					activePlayer,
					row,
					column
				);

		} // showPrompt()

	//=========================================================================

	const changeTurn =
		function changeTurn() {

			let isPlayerOneTurn =
				(activePlayer === players[0])
				&& !gameOver;

			if (isPlayerOneTurn) {

				activePlayer =
					players[1];

				previousPlayer =
					players[0];

			} //if

			else {

				activePlayer =
					players[0];

				previousPlayer =
					players[1];

			} // else

		} // changeTurn()

	//=========================================================================

	const determineWinner =
		function determineWinner() {

			checkRows();

			checkColumns();

			checkDiagonals();

			checkTie();

		} // determineWinner()

	//=========================================================================

	const checkRows =
		function checkRows() {

			const n =
				boardArr.length;

			for (let row = 0; row < n; row++) {

				if (
					(boardArr[row][0] != "-") &&
					(boardArr[row][0] === boardArr[row][1]) &&
					(boardArr[row][1] === boardArr[row][2])
				) {

					gameOver =
						true;

					showWinningMsg();

					break;

				} // if

			} //for

		} // checkRows()

	//=========================================================================

	const checkColumns =
		function checkColumns() {

			const n =
				boardArr.length;

			for (let col = 0; col < n; col++) {

				if (
					(boardArr[0][col] != "-") &&
					(boardArr[0][col] === boardArr[1][col]) &&
					(boardArr[1][col] === boardArr[2][col])
				) {

					gameOver = true;

					showWinningMsg();

					break;

				} // if

			} // for

		} // checkColumns()

	//=========================================================================

	const checkDiagonals =
		function checkDiagonals() {

			if (
				(boardArr[0][0] != "-") &&
				(boardArr[0][0] === boardArr[1][1]) &&
				(boardArr[1][1] === boardArr[2][2])
			) {

				gameOver = true;

				showWinningMsg();

				return;

			} // if

			else if
				(
				(boardArr[2][0] != "-") &&
				(boardArr[2][0] === boardArr[1][1]) &&
				(boardArr[1][1] === boardArr[0][2])
			) {

				gameOver = true;

				showWinningMsg();

				return;

			} // else if

		} // checkDiagonals()

	//=========================================================================

	const showWinningMsg =
		function showWinningMsg() {

			const msg =
				`${previousPlayer.name} wins!`;

			console.log(msg);

		} // showWinningMsg()

	//=========================================================================

	const showTieMsg =
		function showTieMsg() {

			gameOver =
				true;

			const error =
				"Neither player wins, because the board is full!";

			showError(error);

		} // showTieMsg()

	//=========================================================================

	const displayTurn =
		function displayTurn() {

			const msg =
				`${getActivePlayer().name}'s turn`;

			const para =
				document.querySelector("p");

			para.textContent =
				msg;


		} // displayTurn()

	//=========================================================================



	//=========================================================================

	const checkTie =
		function checkTie() {

			const isBoardFull =
				boardArr.numSymbols
				=== 9;

			if (isBoardFull) {

				showTieMsg();

			} // if

		} // checkTie()
	//=========================================================================

	const showError =
		function showError(message) {

			console.error(message);

		} // showError()

	//=========================================================================

	return { startGameBtnClick };

} //Game()

//=========================================================================

// const board =
// 	GameBoard();

// board.displayBoard();

const game =
	Game();

game.startGameBtnClick();
