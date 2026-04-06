function createUser(xOrO, player) {
    const marker = xOrO;
    let name = player;
    const score = 0;

    const getMarker = () => marker;
    const getName = () => name;
    const changeName = (newName) => {
        name = newName;
    };
    const getScore = () => score;
    const addScore = () => { score++ };

    return {getScore, addScore, getMarker, getName, changeName};
};

const player1 = createUser("X", "Player 1");
const player2 = createUser("O", "Player 2");

const gameBoard = (() => {
    const boardArr = [null, null, null, null, null, null, null, null, null];
    console.log(boardArr);

    const getBoard = () => boardArr;

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
    
    return {placeMarker, getBoard, checkWinner};
})();

const gameFlow = (() => {
    let gameStatus = 0;
    let currentPlayer = player1;
    console.log(`Start of game, ${currentPlayer.getName()}'s turn`);
    
    const changePlayer = () => {
        currentPlayer === player1
         ? currentPlayer = player2 
         : currentPlayer = player1;
    }
    
    const getPlayer = () => currentPlayer;

    const changeStatus = (score) => {
        gameStatus = score;
        console.log(`Game status: ${gameStatus}`);
    }

    const playRound = (item) => {
        if (gameStatus === 1) return;

        gameBoard.placeMarker(currentPlayer.getMarker(), item);
        displayController.renderDisplay(item);
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

    return {changeStatus, getPlayer, playRound};
})();

const displayController = (() => {
    const squares = document.querySelectorAll(".square");
    const p1Name = document.querySelector("#p1-info > .name");
    const p2Name = document.querySelector(".player2 > #p2-info > .name");
    const p1Btn = document.querySelector(".player1 > .set-name > button");
    p1Btn.addEventListener("click", () => renderName("X"));
    const p2Btn = document.querySelector(".player2 > .set-name > button");
    p2Btn.addEventListener("click", () => renderName("O"));
    

    const addEvent = () => squares.forEach((square) => {
        console.log(square);
        square.squareStatus = 0;
        square.addEventListener("click", clickEvent);
    });
    
    const clickEvent = (event) => {
        console.log(event.target.squareStatus);
        if (event.target.squareStatus === 0) {
            console.log("it 0")
            gameFlow.playRound(event.target.dataset.item);
            event.target.squareStatus = 1;
        } else if (event.target.squareStatus === 1) {
            console.log(`${event.target.dataset.item}... choose another square`)
        }
    }

    const renderDisplay = () => {
        const board = gameBoard.getBoard();
        console.log(board);
        board.forEach((item, index) => {
            if (item !== null) {
                squares[index].textContent = board[index];
            }
        })
    }

    const renderName = (who) => {
        if (who === "X") {
            const input = document.querySelector("#p1-name");
            const text = input.value;
            player1.changeName(text);
            p1Name.textContent = text;
            p1Btn.remove();
            input.remove();   
        } else if (who === "O") {
            const input = document.querySelector("#p2-name");
            const text = input.value;
            player2.changeName(text);
            p2Name.textContent = text;
            p2Btn.remove();
            input.remove();   
        }
    }

    addEvent();

    return {renderDisplay, renderName}
})();