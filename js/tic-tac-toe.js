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

			clearBoardDisplay();

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

	const clearBoardArray =
		function clearBoardArray() {

			for (let row = 0; row < 3; row++) {

				for (let col = 0; col < 3; col++) {

					board[row][col] =
						"-";

				} // for

			} // for

		} // clearBoardArray()

	//=========================================================================

	const clearBoardDisplay =
		function clearBoardDisplay() {

			gridContainerElem.innerHTML = "";

		} // clearBoardDisplay()

	//=========================================================================

	const getBoard =
		function getBoard() {

			return board;

		} // getBoard()

	//=========================================================================

	return {
		displayBoard,
		clearBoardArray,
		clearBoardDisplay,
		getBoard,
		numSymbols,
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

	const restartGameBtnElem =
		document.querySelector
			("#restart-game-btn");

	const playerOneNameElem =
		document.querySelector
			("#player-one-name");

	const playerTwoNameElem =
		document.querySelector
			("#player-two-name");

	const formElem =
		document.querySelector("form");

	const messageContainerElem =
		document.querySelector
			("#message-container");

	const turnsContainerElem =
		document.querySelector("#turns-container");

	const playerOne =
		Player("", "X");

	const playerTwo =
		Player("", "O");

	const players =
		[
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

				gameOver =
					false;

				playRound();

			}); // addEventListener

		} // savePlayerNames()

	//=========================================================================

	const startGame =
		function startGame() {

			startGameBtnElem.addEventListener("click", () => {

				restartGameBtnElem.disabled =
					true;

				dialogBoxElem.showModal();

				savePlayerNames();

			}); // addEventListener

		} // startGame()

	//=========================================================================

	const restartGame =
		function restartGame() {

			restartGameBtnElem.addEventListener("click", () => {

				board.clearBoardArray();

				board.clearBoardDisplay();

				turnsContainerElem.innerHTML = "";

				messageContainerElem.innerHTML = "";

				board.displayBoard();

				dialogBoxElem.showModal();

				const playerOneName =
					playerOneNameElem.value.trim();

				playerOne.name =
					playerOneName;

				const playerTwoName =
					playerTwoName.value.trim();

				playerTwo.name =
					playerTwoName;

				gameOver =
					false;

				savePlayerNames();

			}); // addEventListener

		} // restartGame()

	//=========================================================================

	const playRound =
		function playRound() {

			board.numSymbols = 0;

			const selectors =
				"#grid-container > div > button";

			const buttons =
				document.querySelectorAll
					(selectors);

			displayTurn();

			buttons.forEach((button) => {

				button.addEventListener("click", () => {

					if (gameOver) {

						return;

					} // if

					const rowIndex =
						button.getAttribute
							("data-row");

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

					displayTurn();

				}); // addEventListener

			}); // forEach

			// board.clearBoard();

		} // playRound()

	//=========================================================================

	const addSymbol =
		function addSymbol
			(
				cell,
				row,
				column
			) {

			messageContainerElem.innerHTML = "";

			const isCellEmpty =
				(boardArr[row][column] === "-");

			if (isCellEmpty) {

				determineSymbolColor(cell);

				boardArr[row][column] =
					activePlayer.symbol;

				cell.textContent =
					activePlayer.symbol;

				board.numSymbols++;

			} // if

			else {

				messageContainerElem.innerHTML = "";

				const para =
					document.createElement("p");
				const error =
					"This cell is occupied!";

				para.style.color =
					"red";

				para.textContent =
					error;

				messageContainerElem.appendChild(para);

				changeTurn();

			} // else

		} // addSymbol()

	//=========================================================================

	const determineSymbolColor =
		function determineSymbolColor(cell) {

			const isPlayerOneTurn =
				(activePlayer === players[0]) &&
				(!gameOver);

			const blue =
				"blue";

			const red =
				"red";

			cell.style.color =
				isPlayerOneTurn ? blue
					: red;

		} // determineSymbolColor()

	//=========================================================================

	const changeTurn =
		function changeTurn() {

			const isPlayerOneTurn =
				(activePlayer === players[0]) &&
				(!gameOver);

			if (isPlayerOneTurn) {

				activePlayer =
					players[1];

				previousPlayer =
					players[0];

			} // if

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

			} // for

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

			restartGameBtnElem.disabled =
				false;

			messageContainerElem.innerHTML = "";

			const activePlayer =
				getActivePlayer().name;

			const message =
				`${activePlayer} wins!`;

			const para =
				document.createElement("p");

			para.style.color =
				"black";

			para.style.fontSize =
				"2em";

			para.textContent =
				message;

			messageContainerElem.appendChild(para);

		} // showWinningMsg()

	//=========================================================================

	const showTieMsg =
		function showTieMsg() {

			restartGameBtnElem.disabled =
				false;

			messageContainerElem.innerHTML = "";

			const message =
				"The Game is Tied!"

			const para =
				document.createElement("p");

			para.style.fontSize =
				"1em";

			para.textContent =
				message;

			messageContainerElem.appendChild(para);

		} // showTieMsg()

	//=========================================================================

	const displayTurn =
		function displayTurn() {

			const player =
				getActivePlayer().name;

			const message =
				`${player}'s turn`;

			turnsContainerElem.innerHTML = "";

			const para =
				document.createElement("p");

			para.textContent = ""

			para.textContent =
				message;

			turnsContainerElem.appendChild(para);

		} // displayTurn()

	//=========================================================================

	const checkTie =
		function checkTie() {

			const isBoardFull =
				(board.numSymbols === 9)
				&& (!gameOver);

			if (isBoardFull) {

				gameOver =
					true;

				showTieMsg();

				return;

			} // if

		} // checkTie()

	//=========================================================================

	return {
		startGame,
		restartGame
	};

} //Game()

//=========================================================================

const board =
	GameBoard();

board.displayBoard();

const game =
	Game();

game.startGame();

game.restartGame();