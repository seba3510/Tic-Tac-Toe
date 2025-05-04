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

			// while (gridContainerElem.firstChild) {
			// 	gridContainerElem.removeChild(gridContainerElem.firstChild)
			// }

			const n = 3;

			for (let row = 0; row < n; row++) {

				for (let col = 0; col < n; col++) {

					const div =
						document.createElement("div");

					const btn =
						document.createElement("button");

					btn.textContent =
						board[row][col];

					div.append(btn);

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
		gridContainerElem: gridContainerElem
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

	let previousPlayer =
		players[0];

	let gameOver =
		false;

	//=========================================================================


	const getActivePlayer =
		function getActivePlayer() {

			return activePlayer;

		} //getActivePlayer()


	//=========================================================================


	const saveNamesBtnClick =
		function saveNamesBtnClick() {


			const saveNamesBtn =
				document.querySelector("#save-names-btn");


			saveNamesBtn.addEventListener("click", (event) => {

				event.preventDefault();

				const playerOneName =
					playerOneNameElem.value.trim();

				players[0].name =
					playerOneName;

				const playerTwoName =
					playerTwoNameElem.value.trim();

				players[1].name =
					playerTwoName;

				dialogBoxElem.close();

				playerOneNameElem.value = "";

				playerTwoNameElem.value = "";


				formElem.submit();

				displayTurn();

			}); // addEventListener()

			// displayTurn();

		} // saveNamesBtnClick()



	//=========================================================================

	const startGameBtnClick =
		function startGameBtnClick() {

			startGameBtnElem.addEventListener("click", (event) => {

				// event.preventDefault();

				dialogBoxElem.showModal();


				saveNamesBtnClick();

				// playRound();

				// displayTurn();

			}); // addEventListener()


		} // startGameBtnClick()

	//=========================================================================

	const playRound =
		function playRound() {

			board.numSymbols = 0;

			displayTurn();


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

				const cell =
					document.querySelector("#grid-container > div");

				cell.textContent =
					player.symbol;

				board.numSymbols++;

				changeTurn();

			} // if

			else {

				const err =
					"This cell is occupied!";

				alert(err);

			} // else

		} // addSymbol()

	//=========================================================================

	const makePlayerMove =
		function makePlayerMove() {

			let boardRow = 0;
			let column = 0;

			const n = 3;

			const cell =
				document.querySelector("#grid-container > div > button");

			for (let row = 0; row < n; row++) {

				for (let col = 0; col < n; col++) {

					cell.addEventListener("click", () => {

						boardRow =
							row;

						column =
							col;

						addSymbol(activePlayer, boardRow, column);

					}); // addEventListener()

					break;


				} // for

			} // for

			// addSymbol
			// 	(
			// 		activePlayer,
			// 		row,
			// 		column
			// 	);

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

			const activePlayer =
				getActivePlayer().name;

			const message =
				`${activePlayer}'s turn`;

			const para =
				document.querySelector("#turns-container > p");

			para.textContent =
				message;

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

const board =
	GameBoard();

board.displayBoard();

const game =
	Game();

game.startGameBtnClick();

