function createUser(xOrO) {
    const marker = xOrO;
    const score = 0;

    const getMarker = () => marker;
    const getScore = () => score;
    const addScore = () => { score++ };

    return {getScore, addScore, getMarker};
};

const player1 = createUser("X");
const player2 = createUser("O");

const gameBoard = (() => {
    const boardArr = [null, null, null, null, null, null, null, null, null];
    console.log(boardArr);
    const {getMarker} = createUser();

    const placeMarker = (marker, item) => {
        boardArr[item] = `${marker}`;
        console.log(boardArr);
    }

    const checkWinner = (marker) => {
        if ((boardArr[0] == marker) && (boardArr[1] == marker) && (boardArr[2] == marker)) {
            console.log("Someone won at 0, 1 and 2");
            ++gameStatus;
        } else if ((boardArr[3] == marker) && (boardArr[4] == marker) && (boardArr[5] == marker)) {
            console.log("Someone won at 3, 4 and 5");
            ++gameStatus;
        } else if ((boardArr[6] == marker) && (boardArr[7] == marker) && (boardArr[8] == marker)) {
            console.log("Someone won at 6, 7 and 8");
            ++gameStatus;
        } else if ((boardArr[0] == marker) && (boardArr[3] == marker) && (boardArr[6] == marker)) {
            console.log("Someone won at 0, 3 and 6");
            ++gameStatus;
        } else if ((boardArr[1] == marker) && (boardArr[4] == marker) && (boardArr[7] == marker)) {
            console.log("Someone won at 1, 4 and 7");
            ++gameStatus;
        } else if ((boardArr[2] == marker) && (boardArr[5] == marker) && (boardArr[8] == marker)) {
            console.log("Someone won at 2, 5 and 8");
            ++gameStatus;
        } else if ((boardArr[0] == marker) && (boardArr[4] == marker) && (boardArr[8] == marker)) {
            console.log("Someone won at 0, 4 and 8");
            ++gameStatus;
        } else if ((boardArr[2] == marker) && (boardArr[4] == marker) && (boardArr[6] == marker)) {
            console.log("Someone won at 2, 4 and 6");
            ++gameStatus;
        } else {
            console.log("no one won");
        }
    }
    
    return {placeMarker, checkWinner};
})();

const gameFlow = (() => {
    const {getMarker, addScore} = createUser();
    
    console.log("Start of game, player 1's turn");
    const gameStatus = 0;
    const currentPlayer = 1;
    
    const changePlayer = () => {
        currentPlayer === 1 ? ++currentPlayer : --currentPlayer;
    }

    const checkStatus = () => {
        if (gameStatus === 1) {
            console.log(`Player ${currentPlayer} has won the game!`);
        } else {
            changePlayer();
            console.log(`It is now Player ${currentPlayer}'s turn`);
        }
    }

    const playRound = (item) => {
        if (gameStatus === 1) return;

        gameBoard.placeMarker(`player${currentPlayer}`.getMarker(), item);
        gameBoard.checkWinner(`player${currentPlayer}`.getMarker());
        checkStatus();
    }

    return {playRound};
})();