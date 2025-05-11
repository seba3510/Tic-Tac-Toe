function GameBoard() {

	const board =
		[
			["-", "-", "-"],
			["-", "-", "-"],
			["-", "-", "-"],
		];

	let numSymbols = 0;

	const gridContainerElem =
		document.querySelector
			("#grid-container");

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

					const button =
						document.createElement("button");

					button.style.fontSize =
						"2rem";

					button.setAttribute("data-row", `${row}`);

					button.setAttribute("data-column", `${col}`);

					button.textContent =
						board[row][col];

					div.appendChild(button);

					gridContainerElem.appendChild(div);

				} // for

			} // for

		} // displayBoard()

	//=========================================================================

	const clearBoard =
		function clearBoard() {

			for (let row = 0; row < 3; row++) {

				for (let col = 0; col < 3; col++) {

					board[row][col] =
						"-";

				} // for

			} // for

		} // clearBoard()

	//=========================================================================

	const getBoard =
		function getBoard() {

			return board;

		} // getBoard()

	//=========================================================================

	return {
		displayBoard,
		clearBoard,
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
		document.querySelector
			("#start-game-btn");

	const playerOneNameElem =
		document.querySelector
			("#player-one-name");

	const playerTwoNameElem =
		document.querySelector
			("#player-two-name");

	const formElem =
		document.querySelector("form");

	const msgContainerElem =
		document.querySelector
			("#message-container");

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

	const savePlayerNames =
		function savePlayerNames() {

			const saveNamesBtn =
				document.querySelector
					("#save-names-btn");

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

				playRound();

			}); // addEventListener()

		} // savePlayerNames()

	//=========================================================================

	const startGame =
		function startGame() {

			startGameBtnElem.addEventListener("click", () => {

				dialogBoxElem.show();

				savePlayerNames();

			}); // addEventListener()

		} // startGame()

	//=========================================================================

	const restartGame =
		function restartGame() {

			board.clearBoard();

			playTurn();

		} // restartGame()

	//=========================================================================

	const playRound =
		function playRound() {

			board.clearBoard();

			board.numSymbols = 0;

			const selectors =
				"#grid-container > div > button";

			const buttons =
				document.querySelectorAll(selectors);

			displayTurn();

			buttons.forEach((button) => {

				button.addEventListener("click", () => {

					if (gameOver) {

						return;

					} // if

					const rowIndex =
						button.getAttribute("data-row");

					const row =
						new Number(rowIndex);

					const columnIndex =
						button.getAttribute("data-column");

					const column =
						new Number(columnIndex);

					addSymbol
						(
							button,
							row,
							column
						);

					determineWinner();

					changeTurn();

				}); // addEventListener()

			}); // foreach

			board.clearBoard();

		} // playRound()

	//=========================================================================

	const addSymbol =
		function addSymbol
			(
				cell,
				row,
				column
			) {

			const selector =
				"#message-container > p";

			const para =
				document.querySelector(selector);

			para.textContent = "";

			const isCellEmpty =
				(boardArr[row][column] === "-");

			if (isCellEmpty) {

				determineSymbolColor();

				boardArr[row][column] =
					activePlayer.symbol;

				cell.textContent =
					activePlayer.symbol;

				board.numSymbols++;

			} // if

			else {

				const error =
					"This cell is occupied!";

				para.style.color =
					"red";

				para.textContent =
					error;

				msgContainerElem.appendChild(para);

				changeTurn();

			} // else

		} // addSymbol()

	//=========================================================================

	const determineSymbolColor =
		function determineSymbolColor() {

			const isPlayerOneTurn =
				activePlayer === players[0] &&
				!gameOver;

			if (isPlayerOneTurn) {

				cell.style.color =
					"blue";

			} // if

			else {

				cell.style.color =
					"red";

			} // else


		} // determineSymbolColor()

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

			displayTurn();

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

					gameOver =
						true;

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

				gameOver =
					true;

				showWinningMsg();

			} // if

			else if
				(
				(boardArr[2][0] != "-") &&
				(boardArr[2][0] === boardArr[1][1]) &&
				(boardArr[1][1] === boardArr[0][2])
			) {

				gameOver =
					true;

				showWinningMsg();

			} // else if

		} // checkDiagonals()

	//=========================================================================

	const showWinningMsg =
		function showWinningMsg() {

			const activePlayer =
				getActivePlayer().name;

			const message =
				`${activePlayer} wins!`;

			const selector =
				"#message-container > p";

			const para =
				document.querySelector(selector);

			para.style.color =
				"black";

			para.style.fontSize =
				"2em";

			para.textContent = "";

			para.textContent =
				message;

			turnsContainer.textContent = "";

		} // showWinningMsg()

	//=========================================================================

	const showTieMsg =
		function showTieMsg() {

			const message =
				"The Game is Tied!";

			const selector =
				"#message-container > p";

			const para =
				document.querySelector(selector);

			para.style.fontSize =
				"2em";

			para.textContent =
				message;

		} // showTieMsg()

	//=========================================================================

	const displayTurn =
		function displayTurn() {

			const activePlayer =
				getActivePlayer().name;

			const message =
				`${activePlayer}'s turn`;

			const container =
				document.querySelector
					("#turns-container");

			container.textContent = "";

			const para =
				document.createElement("p");

			para.textContent =
				message;

			container.appendChild(para);

		} // displayTurn()

	//=========================================================================

	const checkTie =
		function checkTie() {

			const isBoardFull =
				board.numSymbols
				=== 9;

			if (isBoardFull) {

				gameOver =
					true;

				showTieMsg();

				return;

			} // if

		} // checkTie()

	//=========================================================================

	return {
		startGame
	};

} //Game()

//=========================================================================

const board =
	GameBoard();

board.displayBoard();

const game =
	Game();

game.startGame();