const formElem =
    document.querySelector("form");

//=====================================================================

const saveNamesBtnElem =
    document.querySelector("#save-names-btn");

//=====================================================================

const closeDialogBtnElem =
    document.querySelector("#close-dialog-btn");

//=====================================================================

const playerOneNameElem =
    document.querySelector("#player-one-name");

//=====================================================================

const playerTwoNameElem =
    document.querySelector("#player-two-name");

//=====================================================================

function isDataValid() {

    const playerOneName =
        playerOneNameElem.value.trim();

    const isPlayerOneNameValid =
        checkName(playerOneName)

} // isDataValid()
