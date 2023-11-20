// vairable for the logic
let board;
let score = 0;
let rows = 4;
let columns = 4;
// variable for fucntion alerts
let is2048Exist = false;
let is4096Exist = false;
let is8192Exist = false;

function setGame(){

    board = [
        [0, 0, 0, 0,],
        [0, 0, 0, 0,],
        [0, 0, 0, 0,],
        [0, 0, 0, 0,]
    ];

for(let r=0; r < rows; r++){
    for(let c=0; c < columns; c++){
        let tile = document.createElement("div");

            tile.id = r.toString() + "-" + c.toString();

        let num = board [r][c];

        updateTile(tile, num);

        document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();
}

function updateTile(tile, num){

    tile.innerText = ""; 
    
    tile.classList.value = ""; 
   
    tile.classList.add("tile");

   
    if(num > 0) {
        tile.innerText = num.toString();

        if (num <= 4096){
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}

window.onload = function(){
    setGame();
}

function handleSlide(e){

    /* console.log(e.code); */

    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.code)){

        e.preventDefault();
        if (e.code == "ArrowLeft") {
            slideLeft();
            setTwo();
        } else if (e.code == "ArrowRight") {
            slideRight();
            setTwo();
        } else if (e.code == "ArrowUp") {
            slideUp();
            setTwo();
        } else if (e.code == "ArrowDown") {
            slideDown();
            setTwo();
        }
    }

    document.getElementById("score").innerText = score;

    checkWin();

    if(hasLost()){

        setTimeout(() =>{
            alert("Game Over Youve lost The game restart");
            restartGame();
            alert("click any key to restart");
        }, 100)
    }
}

document.addEventListener("keydown", handleSlide);

function filterZero(row){
    return row.filter(num => num != 0);
}

function slideLeft(){
    for ( let r = 0; r < rows; r++){

        let row = board[r];

// for animation
        let originalRow = row.slice();

        row = slide(row);

        board[r] = row;

        for(let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];

            updateTile(tile, num);

//for animation
            if (originalRow[c] !== num && num !== 0) { 
                tile.style.animation = "slide-from-right 0.3s";
                setTimeout(() => {
                    tile.style.animation = "";
                }, 300);
            }
        }

    }
}

function slideRight(){
    for ( let r = 0; r < rows; r++){

        let row = board[r];

//for animation
        let originalRow = row.slice();

        row.reverse();
        row = slide(row); // [4, 2, 0, 0]
        row.reverse(); //[0, 0, 2 , 4]

        board[r] = row;

        for(let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];

            updateTile(tile, num);

//for animation
            if (originalRow[c] !== num && num !== 0) { 
                tile.style.animation = "slide-from-left 0.3s";
                setTimeout(() => {
                    tile.style.animation = "";
                }, 300);
            }
        }

    }
}

function slide(row){
    row = filterZero(row);
    // [0, 2, 2, 2]   
    // [, 2, 2, 2]

    for(let i = 0; i < row.length - 1; i++){
        if(row[i] == row[i+1]){
            row[i] *= 2;    
            row[i+1] = 0;
            score += row[i];       
        } 
    }

    row = filterZero(row); //[4, 2]

    while(row.length < columns){
        row.push(0);
    } // [4, 2, 0, 0]

    return row;
}

function slideUp(){
    for(let c = 0; c < columns; c++){ //make the columns like an array
    
        let row = [board[0][c], 
                     board[1][c], 
                     board[2][c], 
                     board[3][c]
                ];
// for animation
        let originalRow = row.slice();

        row = slide(row);
        
//for animation
        let changedIndices = [];
	        for (let r = 0; r < rows; r++) { 
	            if (originalRow[r] !== row[r]) {
	                changedIndices.push(r);
	            }
	        }

        for(let r = 0; r <rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile, num);

//for animation
            if (changedIndices.includes(r) && num !== 0) {
	                tile.style.animation = "slide-from-bottom 0.3s";
	                setTimeout(() => {
	                    tile.style.animation = "";
	                }, 300);
	            }

        }
    }
}

function slideDown(){
    for(let c = 0; c < columns; c++){ //make the columns like an array

        let row =   [board[0][c], 
                     board[1][c], 
                     board[2][c], 
                     board[3][c]
                    ];
//animation
        let originalRow = row.slice();

        row.reverse();
        row = slide(row);
        row.reverse();
//for animation
        let changedIndices = [];
	        for (let r = 0; r < rows; r++) { 
	            if (originalRow[r] !== row[r]) {
	                changedIndices.push(r);
	            }
	        }

        for(let r = 0; r <rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile, num);
//for animation
            if (changedIndices.includes(r) && num !== 0) {
	                tile.style.animation = "slide-from-top 0.3s";
	                setTimeout(() => {
	                    tile.style.animation = "";
	                }, 300);
	            }

        }
    }
}

function hasEmptyTile(){

    for (let r = 0; r < rows; r++){

        for(let c = 0; c < columns; c++){

            if(board[r][c] == 0){
                return true;
            }
        }
    }
    
    return false;

}

function setTwo(){
    if(!hasEmptyTile()){
        return;
    }

    let found = false;
    
    while(!found){
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if(board[r][c] == 0){
            
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2")

            found = true;
        }
    }
}

function checkWin(){
    for(let r =0; r < rows; r++){
        for(let c = 0; c < columns; c++){
            if(board[r][c] == 2048 && is2048Exist == false){
                alert('You Win! You got the 2048'); 
                is2048Exist = true; 
            } else if(board[r][c] == 4096 && is4096Exist == false) {
                alert("You are unstoppable at 4096! You are fantastically unstoppable!");
                is4096Exist = true;
            } else if(board[r][c] == 8192 && is8192Exist == false) {
                alert("Victory!: You have reached 8192! You are incredibly awesome!");
                is8192Exist = true;
            }
        }
    }
}

function hasLost() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] === 0) {
                return false;
            }

            const currentTile = board[r][c];

            if (
                r > 0 && board[r - 1][c] === currentTile ||
                r < rows - 1 && board[r + 1][c] === currentTile ||
                c > 0 && board[r][c - 1] === currentTile ||
                c < columns - 1 && board[r][c + 1] === currentTile
            ) {
                return false;
            }
        }
    }


    return true;
}

function restartGame(){

    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++){
            board[r][c] = 0
        }
    }

    score = 0 ;
    setTwo();
}