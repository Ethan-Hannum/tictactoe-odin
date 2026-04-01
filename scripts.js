function createUser(xOrO, player) {
    const marker = xOrO;
    const name = player;
    const score = 0;

    const getMarker = () => marker;
    const getName = () => name;
    const getScore = () => score;
    const addScore = () => { score++ };

    return {getScore, addScore, getMarker, getName};
};

const gameBoard = (() => {
    const boardArr = [null, null, null, null, null, null, null, null, null];
    console.log(boardArr);

    const placeMarker = (marker, item) => {
        boardArr[item] = `${marker}`;
        console.log(boardArr);
    }

    const checkWinner = (marker) => {
        if ((boardArr[0] == marker) && (boardArr[1] == marker) && (boardArr[2] == marker)) {
            console.log("Someone won at 0, 1 and 2");
            gameFlow.changeStatus(1);
        } else if ((boardArr[3] == marker) && (boardArr[4] == marker) && (boardArr[5] == marker)) {
            console.log("Someone won at 3, 4 and 5");
            gameFlow.changeStatus(1);
        } else if ((boardArr[6] == marker) && (boardArr[7] == marker) && (boardArr[8] == marker)) {
            console.log("Someone won at 6, 7 and 8");
            gameFlow.changeStatus(1);
        } else if ((boardArr[0] == marker) && (boardArr[3] == marker) && (boardArr[6] == marker)) {
            console.log("Someone won at 0, 3 and 6");
            gameFlow.changeStatus(1);
        } else if ((boardArr[1] == marker) && (boardArr[4] == marker) && (boardArr[7] == marker)) {
            console.log("Someone won at 1, 4 and 7");
            gameFlow.changeStatus(1);
        } else if ((boardArr[2] == marker) && (boardArr[5] == marker) && (boardArr[8] == marker)) {
            console.log("Someone won at 2, 5 and 8");
            gameFlow.changeStatus(1);
        } else if ((boardArr[0] == marker) && (boardArr[4] == marker) && (boardArr[8] == marker)) {
            console.log("Someone won at 0, 4 and 8");
            gameFlow.changeStatus(1);
        } else if ((boardArr[2] == marker) && (boardArr[4] == marker) && (boardArr[6] == marker)) {
            console.log("Someone won at 2, 4 and 6");
            gameFlow.changeStatus(1);
        } else if (!boardArr.includes(null)) {
            console.log("checkWinner: Tie game!");
            gameFlow.changeStatus(2);
        }
    }
    
    return {placeMarker, checkWinner};
})();

const gameFlow = (() => {
    const player1 = createUser("X", "Nichsolson");
    const player2 = createUser("O", "Travis");
    console.log("Start of game, player 1's turn");
    let gameStatus = 0;
    let currentPlayer = player1;
    
    const changePlayer = () => {
        currentPlayer === player1
         ? currentPlayer = player2 
         : currentPlayer = player1;
    }

    const changeStatus = (score) => {
        gameStatus = score;
        console.log(`Game status: ${gameStatus}`);
    }

    const playRound = (item) => {
        if (gameStatus === 1) return;

        gameBoard.placeMarker(currentPlayer.getMarker(), item);
        gameBoard.checkWinner(currentPlayer.getMarker());
        if (gameStatus === 1) {
            console.log(`${currentPlayer.getName()} has won the game!`);
        } else if (gameStatus === 2) {
            console.log("playRound: Tie game!")
        } else {
            changePlayer();
            console.log(`It is now ${currentPlayer.getName()}'s turn`);
        }
    }

    return {changeStatus, playRound};
})();