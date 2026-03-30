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

    const placeMarker = (marker, item) => {
        boardArr[item] = `${marker}`;
        console.log(boardArr);
    }

    const checkWinner = (marker) => {
        if ((board[0] == marker) && (board[1] == marker) && (board[2] === marker)) {
            console.log("Someone won at 0, 1 and 2");
        } else if ((board[3] == marker) && (board[4] == marker) && (board[5] == marker)) {
            console.log("Someone won at 3, 4 and 5");
        } else if ((board[6] == marker) && (board[7] == marker) && (board[8] == marker)) {
            console.log("Someone won at 6, 7 and 8");
        } else if ((board[0] == marker) && (board[3] == marker) && (board[6] == marker)) {
            console.log("Someone won at 0, 3 and 6");
        } else if ((board[1] == marker) && (board[4] == marker) && (board[7] == marker)) {
            console.log("Someone won at 1, 4 and 7");
        } else if ((board[2] == marker) && (board[5] == marker) && (board[8] == marker)) {
            console.log("Someone won at 2, 5 and 8");
        } else if ((board[0] == marker) && (board[4] == marker) && (board[8] == marker)) {
            console.log("Someone won at 0, 4 and 8");
        } else if ((board[2] == marker) && (board[4] == marker) && (board[6] == marker)) {
            console.log("Someone won at 2, 4 and 6");
        }
    }
    
    return {placeMarker};
})();