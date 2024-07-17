let board = [
    ["","","",""],
    ["","","",""],
    ["","","",""],
    ["","","",""]
];
let score = 0;
function myLoad(){ /* spawns in the first 2 blocks when the page loads */
    let yRandomTile1 = Math.floor(Math.random() * (1 + 4 - 1)) + 1;
    let xRandomTile1 = Math.floor(Math.random() * (1 + 4 - 1)) + 1;
    let yRandomTile2;
    let xRandomTile2;
    let test = true;
    while(test){ /* makes sure that the 2 blocks spawn not on the same tile */
        yRandomTile2 = Math.floor(Math.random() * (1 + 4 - 1)) + 1;
        xRandomTile2 = Math.floor(Math.random() * (1 + 4 - 1)) + 1;
        if(xRandomTile1 != xRandomTile2 || yRandomTile1 != yRandomTile2){
            test = false;
        }
    }
    let box1 = document.createElement('div');
    document.querySelector(".tile-holder-" + yRandomTile1 + "-" + xRandomTile1).appendChild(box1);
    box1.classList.add("tile", "tile-2", "tile-position-" + yRandomTile1 + "-" + xRandomTile1)
    box1.innerHTML = "2";
    let box2 = document.createElement('div');
    document.querySelector(".tile-holder-" + yRandomTile2 + "-" + xRandomTile2).appendChild(box2);
    box2.classList.add("tile", "tile-2", "tile-position-" + yRandomTile2 + "-" + xRandomTile2);
    box2.innerHTML = "2";
    board[yRandomTile1-1][xRandomTile1-1] = "tile-2";
    board[yRandomTile2-1][xRandomTile2-1] = "tile-2";
}
function noAdjacent(){
    let test = false;
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 3; j++){
            if(board[i][j] == board[i][j+1]){
                test = true;
            }
        }
    }
    for(let j = 0; j < 4; j++){
        for(let i = 0; i < 3; i++){
            if(board[i][j] == board[i+1][j]){
                test = true;
            }
        }
    }
    return test;
}
function checkEnd(){
    if(document.querySelector(".tile-2048") != null){
        let box1;
        let box2;
        let box3;
        let button1;
        box1 = document.createElement("div");
        document.querySelector(".main-container").appendChild(box1);
        box1.classList.add("lose-container");
        box2 = document.createElement("div");
        document.querySelector(".lose-container").appendChild(box2);
        box2.classList.add("lose-container-content");
        box3 = document.createElement("div");
        document.querySelector(".lose-container-content").appendChild(box3);
        box3.classList.add("text-game-over");
        button1 = document.createElement("button");
        document.querySelector(".lose-container-content").appendChild(button1);
        button1.type = "button";
        button1.classList.add("game-over-button");
        button1.innerHTML = "PLAY AGAIN";
        box3.innerHTML = "YOU WON!"
        box3.style.color = "salmon";
    }
    else if(noAdjacent() == false){
        let box1;
        let box2;
        let box3;
        let button1;
        box1 = document.createElement("div");
        document.querySelector(".main-container").appendChild(box1);
        box1.classList.add("lose-container");
        box2 = document.createElement("div");
        document.querySelector(".lose-container").appendChild(box2);
        box2.classList.add("lose-container-content");
        box3 = document.createElement("div");
        document.querySelector(".lose-container-content").appendChild(box3);
        box3.classList.add("text-game-over");
        button1 = document.createElement("button");
        document.querySelector(".lose-container-content").appendChild(button1);
        button1.type = "button";
        button1.classList.add("game-over-button");
        button1.innerHTML = "PLAY AGAIN";
        box3.innerHTML = "GAME OVER !"
    }
}
function spawnTile(){ // spawns a tile randomly in one of the empty spots ( after each move ).
    let test = true;
    while(test){
        yRandomTile1 = Math.floor(Math.random() * (1 + 4 - 1)) + 1;
        xRandomTile1 = Math.floor(Math.random() * (1 + 4 - 1)) + 1;
        if(board[yRandomTile1-1][xRandomTile1-1] == ""){
            test = false;
        }
    }
    let box1 = document.createElement('div');
    document.querySelector(".tile-holder-" + yRandomTile1 + "-" + xRandomTile1).appendChild(box1);
    box1.classList.add("tile", "tile-2", "tile-position-" + yRandomTile1 + "-" + xRandomTile1)
    box1.innerHTML = "2";
    board[yRandomTile1-1][xRandomTile1-1] = "tile-2";
}
function moveTile(direction){
    if(direction == "left"){
        for(let i = 0; i < board.length; i++){ /* MOVES all the tiles to the left  when left arrow key is clicked */
            for(let l = 1; l < 4; l ++){
                for(let k = 1; k < 4; k++){
                    for(let j = 0; j < board[i].length; j++){
                        if(j != 0){
                            if(board[i][j-1] == "" && board[i][j] != "" && j == k){
                                board[i][j-1] = board[i][j];
                                board[i][j] = "";
                                document.querySelector(".tile-position-" + (i + 1) + "-" + (j + 1)).classList.add("tile-position-" + (i +1 ) + "-" + (j));
                                document.querySelector(".tile-position-" + (i + 1) + "-" + (j + 1)).classList.remove("tile-position-" + (i + 1) + "-" + (j + 1));
                                let tile = document.querySelector(".tile-position-" + (i +1 ) + "-" + (j)).cloneNode(true);
                                document.querySelector(".tile-position-" + (i + 1) + "-" + (j)).remove();
                                document.querySelector(".tile-holder-" + (i + 1) + "-" + (j)).appendChild(tile);
                            }
                        }
                    }
                }
            }
        }
        for(let i = 0; i < board.length; i++){ // Merges tiles together if they're of the same number.
            for(let l = 1; l < 4; l ++){
                for(let k = 1; k < 4; k++){
                    for(let j = 0; j < board[i].length; j++){
                        if(j != 0){
                            if(board[i][j] == board[i][j-1] && board[i][j] != ""){
                                board[i][j] = "";
                                board[i][j-1] = "tile-" + document.querySelector(".tile-position-" + (i + 1 ) + "-" + (j)).innerHTML * 2;
                                document.querySelector(".tile-position-" + (i + 1 ) + "-" + (j + 1)).remove();
                                document.querySelector(".tile-position-" + (i + 1 ) + "-" + (j)).classList.add("tile-" + document.querySelector(".tile-position-" + (i + 1 ) + "-" + (j)).innerHTML*2);
                                document.querySelector(".tile-position-" + (i + 1 ) + "-" + (j)).innerHTML = document.querySelector(".tile-position-" + (i + 1 ) + "-" + (j)).innerHTML*2;
                                document.querySelector(".tile-position-" + (i + 1 ) + "-" + (j)).classList.remove("tile-" + document.querySelector(".tile-position-" + (i + 1 ) + "-" + (j)).innerHTML / 2);
                                score += Number(document.querySelector(".tile-position-" + (i + 1 ) + "-" + (j)).innerHTML);
                                document.querySelector(".score-number").innerHTML = score;
                            }
                        }
                    }
                }
            }
        }
        for(let i = 0; i < board.length; i++){ // moves tiles to the left again (bugfix).
            for(let l = 1; l < 4; l ++){
                for(let k = 1; k < 4; k++){
                    for(let j = 0; j < board[i].length; j++){
                        if(j != 0){
                            if(board[i][j-1] == "" && board[i][j] != "" && j == k){
                                board[i][j-1] = board[i][j];
                                board[i][j] = "";
                                document.querySelector(".tile-position-" + (i + 1) + "-" + (j + 1)).classList.add("tile-position-" + (i +1 ) + "-" + (j));
                                document.querySelector(".tile-position-" + (i + 1) + "-" + (j + 1)).classList.remove("tile-position-" + (i + 1) + "-" + (j + 1));
                                let tile = document.querySelector(".tile-position-" + (i +1 ) + "-" + (j)).cloneNode(true);
                                document.querySelector(".tile-position-" + (i + 1) + "-" + (j)).remove();
                                document.querySelector(".tile-holder-" + (i + 1) + "-" + (j)).appendChild(tile);
                            }
                        }
                    }
                }
            }
        }
    }
    if(direction == "right"){
        for(let i = 0; i < board.length; i++){ /* MOVES all the tiles to the right  when right arrow key is clicked */
            for(let l = 1; l < 4; l ++){
                for(let k = 2; k >= 0; k--){
                    for(let j = 3; j >= 0; j--){
                        if(j != 3){
                            if(board[i][j+1] == "" && board[i][j] != "" && j == k){
                                board[i][j+1] = board[i][j];
                                board[i][j] = "";
                                document.querySelector(".tile-position-" + (i + 1) + "-" + (j + 1)).classList.add("tile-position-" + (i +1 ) + "-" + (j+2));
                                document.querySelector(".tile-position-" + (i + 1) + "-" + (j + 1)).classList.remove("tile-position-" + (i + 1) + "-" + (j + 1));
                                let tile = document.querySelector(".tile-position-" + (i +1 ) + "-" + (j+2)).cloneNode(true);
                                document.querySelector(".tile-position-" + (i + 1) + "-" + (j+2)).remove();
                                document.querySelector(".tile-holder-" + (i + 1) + "-" + (j+2)).appendChild(tile);
                            }
                        }
                    }
                }
            }
        }
        for(let i = 0; i < board.length; i++){ // Merges tiles together if they're of the same number.
            for(let l = 1; l < 4; l ++){
                for(let k = 2; k >= 0; k--){
                    for(let j = 3; j >= 0; j--){
                        if(j != 3){
                            if(board[i][j] == board[i][j+1] && board[i][j] != ""){
                                board[i][j] = "";
                                board[i][j+1] = "tile-" + document.querySelector(".tile-position-" + (i + 1 ) + "-" + (j+2)).innerHTML * 2;
                                document.querySelector(".tile-position-" + (i + 1 ) + "-" + (j + 1)).remove();
                                document.querySelector(".tile-position-" + (i + 1 ) + "-" + (j+2)).classList.add("tile-" + document.querySelector(".tile-position-" + (i + 1 ) + "-" + (j+2)).innerHTML*2);
                                document.querySelector(".tile-position-" + (i + 1 ) + "-" + (j+2)).innerHTML = document.querySelector(".tile-position-" + (i + 1 ) + "-" + (j+2)).innerHTML*2;
                                document.querySelector(".tile-position-" + (i + 1 ) + "-" + (j+2)).classList.remove("tile-" + document.querySelector(".tile-position-" + (i + 1 ) + "-" + (j+2)).innerHTML / 2);
                                score += Number(document.querySelector(".tile-position-" + (i + 1 ) + "-" + (j+2)).innerHTML);
                                document.querySelector(".score-number").innerHTML = score;
            
                            }
                        }
                    }
                }
            }
        }
        for(let i = 0; i < board.length; i++){ // moves tiles to the right again (bugfix).
            for(let l = 1; l < 4; l++){
                for(let k = 2; k >= 0; k--){
                    for(let j = 3; j >= 0; j--){
                        if(j != 3){
                            if(board[i][j+1] == "" && board[i][j] != "" && j == k){
                                board[i][j+1] = board[i][j];
                                board[i][j] = "";
                                document.querySelector(".tile-position-" + (i + 1) + "-" + (j + 1)).classList.add("tile-position-" + (i +1 ) + "-" + (j+2));
                                document.querySelector(".tile-position-" + (i + 1) + "-" + (j + 1)).classList.remove("tile-position-" + (i + 1) + "-" + (j + 1));
                                let tile = document.querySelector(".tile-position-" + (i +1 ) + "-" + (j+2)).cloneNode(true);
                                document.querySelector(".tile-position-" + (i + 1) + "-" + (j+2)).remove();
                                document.querySelector(".tile-holder-" + (i + 1) + "-" + (j+2)).appendChild(tile);
                            }
                        }
                    }
                }
            }
        }
    }
    if(direction == "up"){
        for(let j = 0; j < 4; j++){ // moves tiles above.
            for(let l = 1; l < 4; l++){
                for(let k = 1; k < 4; k++){
                    for(let i = 0; i < 4; i++){
                        if( i != 0){
                            if(board[i-1][j] == "" && board[i][j] != "" && i == k ){
                                board[i-1][j] = board[i][j];
                                board[i][j] = "";
                                document.querySelector(".tile-position-" + (i + 1) + "-" + (j + 1)).classList.add("tile-position-" + (i) + "-" + (j+1));
                                document.querySelector(".tile-position-" + (i + 1) + "-" + (j + 1)).classList.remove("tile-position-" + (i+1) + "-" + (j + 1));
                                let tile = document.querySelector(".tile-position-" + (i) + "-" + (j+1)).cloneNode(true);
                                document.querySelector(".tile-position-" + (i) + "-" + (j+1)).remove();
                                document.querySelector(".tile-holder-" + (i) + "-" + (j+1)).appendChild(tile);
                            }
                        }
                    }
                }
            }
        }
        for(let j = 0; j < 4; j++){ // merges tiles together (above).
            for(let l = 1; l < 4; l++){
                for(let k = 1; k < 4; k++){
                    for(let i = 0; i < 4; i++){
                        if( i != 0){
                            if(board[i-1][j] == board[i][j]  && board[i][j] != ""){
                                board[i][j] = "";
                                board[i-1][j] = "tile-" + document.querySelector(".tile-position-" + (i) + "-" + (j+1)).innerHTML * 2;
                                document.querySelector(".tile-position-" + (i + 1 ) + "-" + (j + 1)).remove();
                                document.querySelector(".tile-position-" + (i) + "-" + (j + 1)).classList.add("tile-" + document.querySelector(".tile-position-" + (i) + "-" + (j + 1)).innerHTML*2);
                                document.querySelector(".tile-position-" + (i) + "-" + (j + 1)).innerHTML = document.querySelector(".tile-position-" + (i) + "-" + (j + 1)).innerHTML*2;
                                document.querySelector(".tile-position-" + (i) + "-" + (j + 1)).classList.remove("tile-" + document.querySelector(".tile-position-" + (i) + "-" + (j + 1)).innerHTML / 2);
                                score += Number(document.querySelector(".tile-position-" + (i) + "-" + (j + 1)).innerHTML);
                                document.querySelector(".score-number").innerHTML = score;
                            }
                        }
                    }
                }
            }
        }
        for(let j = 0; j < 4; j++){ // moves tiles above (bugfix).
            for(let l = 1; l < 4; l++){
                for(let k = 1; k < 4; k++){
                    for(let i = 0; i < 4; i++){
                        if( i != 0){
                            if(board[i-1][j] == "" && board[i][j] != "" && i == k ){
                                board[i-1][j] = board[i][j];
                                board[i][j] = "";
                                document.querySelector(".tile-position-" + (i + 1) + "-" + (j + 1)).classList.add("tile-position-" + (i) + "-" + (j+1));
                                document.querySelector(".tile-position-" + (i + 1) + "-" + (j + 1)).classList.remove("tile-position-" + (i+1) + "-" + (j + 1));
                                let tile = document.querySelector(".tile-position-" + (i) + "-" + (j+1)).cloneNode(true);
                                document.querySelector(".tile-position-" + (i) + "-" + (j+1)).remove();
                                document.querySelector(".tile-holder-" + (i) + "-" + (j+1)).appendChild(tile);
                            }
                        }
                    }
                }
            }
        }
    }
    if(direction == "down"){
        for(let j = 0; j < 4; j++){ //moves tiles down.
            for(let l = 1; l < 4; l++){
                for(let k = 2; k >= 0; k--){
                    for(let i = 3; i >= 0; i--){
                        if( i != 3 ){
                            if(board[i+1][j] == "" && board[i][j] != "" && i == k){
                                board[i+1][j] = board[i][j];
                                board[i][j] = "";
                                document.querySelector(".tile-position-" + (i + 1) + "-" + (j + 1)).classList.add("tile-position-" + (i+2) + "-" + (j+1));
                                document.querySelector(".tile-position-" + (i + 1) + "-" + (j + 1)).classList.remove("tile-position-" + (i+1) + "-" + (j + 1));
                                let tile = document.querySelector(".tile-position-" + (i+2) + "-" + (j+1)).cloneNode(true);
                                document.querySelector(".tile-position-" + (i+2) + "-" + (j+1)).remove();
                                document.querySelector(".tile-holder-" + (i+2) + "-" + (j+1)).appendChild(tile);
                            }
                        }
                    }
                }
            }
        }
        for(let j = 0; j < 4; j++){ // merges tiles together ( down ).
            for(let l = 1; l < 4; l++){
                for(let k = 2; k >= 0; k--){
                    for(let i = 3; i >= 0; i--){
                        if( i != 3 ){
                            if(board[i+1][j] == board[i][j] && board[i][j] != ""){
                                board[i][j] = "";
                                board[i+1][j] = "tile-" + document.querySelector(".tile-position-" + (i+2) + "-" + (j+1)).innerHTML * 2;
                                document.querySelector(".tile-position-" + (i + 1 ) + "-" + (j + 1)).remove();
                                document.querySelector(".tile-position-" + (i+2) + "-" + (j + 1)).classList.add("tile-" + document.querySelector(".tile-position-" + (i+2) + "-" + (j + 1)).innerHTML*2);
                                document.querySelector(".tile-position-" + (i+2) + "-" + (j + 1)).innerHTML = document.querySelector(".tile-position-" + (i+2) + "-" + (j + 1)).innerHTML*2;
                                document.querySelector(".tile-position-" + (i+2) + "-" + (j + 1)).classList.remove("tile-" + document.querySelector(".tile-position-" + (i+2) + "-" + (j + 1)).innerHTML / 2);
                                score += Number(document.querySelector(".tile-position-" + (i+2) + "-" + (j + 1)).innerHTML);
                                document.querySelector(".score-number").innerHTML = score;
                            }
                        }
                    }
                }
            }
        }
        for(let j = 0; j < 4; j++){ //moves tiles down again ( bugfix ).
            for(let l = 1; l < 4; l++){
                for(let k = 2; k >= 0; k--){
                    for(let i = 3; i >= 0; i--){
                        if( i != 3 ){
                            if(board[i+1][j] == "" && board[i][j] != "" && i == k){
                                board[i+1][j] = board[i][j];
                                board[i][j] = "";
                                document.querySelector(".tile-position-" + (i + 1) + "-" + (j + 1)).classList.add("tile-position-" + (i+2) + "-" + (j+1));
                                document.querySelector(".tile-position-" + (i + 1) + "-" + (j + 1)).classList.remove("tile-position-" + (i+1) + "-" + (j + 1));
                                let tile = document.querySelector(".tile-position-" + (i+2) + "-" + (j+1)).cloneNode(true);
                                document.querySelector(".tile-position-" + (i+2) + "-" + (j+1)).remove();
                                document.querySelector(".tile-holder-" + (i+2) + "-" + (j+1)).appendChild(tile);
                            }
                        }
                    }
                }
            }
        }
    }
}
document.querySelector(".new-game-button").addEventListener("click", (e) =>{ /* resets the game to 0 and spanws the first 2 blocks when the new game button is clicked */
    let allTiles = document.querySelectorAll(".tile");
    allTiles.forEach((item) =>{
        item.remove();
    })
    let yRandomTile1 = Math.floor(Math.random() * (1 + 4 - 1)) + 1;
    let xRandomTile1 = Math.floor(Math.random() * (1 + 4 - 1)) + 1;
    let yRandomTile2;
    let xRandomTile2;
    let test = true;
    while(test){ /* makes sure that the 2 blocks spawn not on the same tile */
        yRandomTile2 = Math.floor(Math.random() * (1 + 4 - 1)) + 1;
        xRandomTile2 = Math.floor(Math.random() * (1 + 4 - 1)) + 1;
        if(xRandomTile1 != xRandomTile2 || yRandomTile1 != yRandomTile2){
            test = false;
        }
    }
    let box1 = document.createElement('div');
    document.querySelector(".tile-holder-" + yRandomTile1 + "-" + xRandomTile1).appendChild(box1);
    box1.classList.add("tile", "tile-2", "tile-position-" + yRandomTile1 + "-" + xRandomTile1)
    box1.innerHTML = "2";
    let box2 = document.createElement('div');
    document.querySelector(".tile-holder-" + yRandomTile2 + "-" + xRandomTile2).appendChild(box2);
    box2.classList.add("tile", "tile-2", "tile-position-" + yRandomTile2 + "-" + xRandomTile2);
    box2.innerHTML = "2";
    board = [
        ["","","",""],
        ["","","",""],
        ["","","",""],
        ["","","",""]
    ];
    board[yRandomTile1-1][xRandomTile1-1] = "tile-2";
    board[yRandomTile2-1][xRandomTile2-1] = "tile-2";
    score = 0;
    document.querySelector(".score-number").innerHTML = score;
});
document.addEventListener("keyup", (e) =>{ // gives player the ability to interact with the game with keyboard. ( arrow keys in this case)
    keyName = e.key;
    if(keyName === "ArrowLeft"){
        moveTile("left");
        spawnTile();
        checkEnd();
    }
    if(keyName === "ArrowRight"){
        moveTile("right");
        spawnTile();
        checkEnd();
    }
    if(keyName === "ArrowUp"){
        moveTile("up");
        spawnTile();
        checkEnd();
    }
    if(keyName === "ArrowDown"){
        moveTile("down");
        spawnTile();
        checkEnd();
    }
});