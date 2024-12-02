document.addEventListener("DOMContentLoaded", () => {
    // Select DOM elements
    let boxes = document.querySelectorAll(".box");
    let resetBtn = document.querySelector("#reset-btn");
    let newGameBtn = document.querySelector("#new-btn");
    let msgContainer = document.querySelector(".msg-container");
    let msg = document.querySelector("#msg");
    let turn0 = true; // True for "O", False for "X"
    let gameOver = false; // Track whether the game is over

    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Attach click events to all boxes
    boxes.forEach((box, index) => {
        box.addEventListener("click", () => {
            if (gameOver || box.innerText !== "") return;

            box.innerText = turn0 ? "O" : "X";
            box.style.color = turn0 ? "blue" : "red";
            turn0 = !turn0;

            checkWinnerOrDraw();
        });
    });

    // Check for a winner or a draw
    const checkWinnerOrDraw = () => {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (
                boxes[a].innerText !== "" &&
                boxes[a].innerText === boxes[b].innerText &&
                boxes[a].innerText === boxes[c].innerText
            ) {
                showWinner(boxes[a].innerText);
                return;
            }
        }

        if ([...boxes].every((box) => box.innerText !== "")) {
            showWinner("Draw");
        }
    };

    // Display winner or draw
    const showWinner = (result) => {
        msg.innerText = result === "Draw" ? "It's a Draw!" : `Congratulations! Winner is ${result}`;
        msgContainer.classList.remove("hide");
        gameOver = true;
    };

    // Reset button functionality
    resetBtn.addEventListener("click", () => {
        console.log("Reset Game Button Clicked");
        resetGame();
    });

    // New game button functionality
    newGameBtn.addEventListener("click", () => {
        console.log("New Game Button Clicked");
        resetGame();
        msgContainer.classList.add("hide"); // Hide message container
    });

    // Reset the game
    const resetGame = () => {
        boxes.forEach((box) => {
            box.innerText = "";
            box.classList.remove("disabled");
        });
        turn0 = true;
        gameOver = false;
        msg.innerText = "";
    };
});
