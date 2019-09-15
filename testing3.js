
let pawnAttack = (white,row,col,board,pawn) => {
    //For white king
    if(white){
        row = row - 1;
        if(row < 0)
            return false;
    }else{
    //for black king
        row = row + 1;
        if(row > 7)
            return false
    }
    if(board[row][col-1] === pawn)
        return true;

    if(board[row][col+1] === pawn)
        return true;

    return false
}

let diagonalAttack = (row,col,board,team,attackers) => {
    let x = row + 1;
    let y = col + 1;
    //lower right
    while(x <= 7 && y <= 7){
        if(board[x][y].charAt(0) === team) 
            break;
        else if(attackers.includes(board[x][y])) 
            return true;
        x++;
        y++;
    }
    //lower right
    x = row + 1;
    y = col - 1;
    while(x <= 7 && y >= 0){
        if(board[x][y].charAt(0) === team)
            break;
        else if(attackers.includes(board[x][y]))
            return true;
        x++;
        y--;
    }
    //upper right
    x = row - 1;
    y = col + 1;
    while(x >= 0 && y <= 7){
        if(board[x][y].charAt(0) === team)
            break;
        else if(attackers.includes(board[x][y]))
            return true;
        x--;
        y++;
    }
    //upper left
    x = row - 1;
    y = col - 1;
    while(x >= 0 && y >= 0){
        if(board[x][y].charAt(0) === team)
            break;
        else if(attackers.includes(board[x][y]))
            return true;
        x--;
        y--;
    } 
    return false
}

let checkKnight = (x,y1,y2,board,enemy) => {
    if(board[x][y1] == enemy)
        return true;
    if(board[x][y2] === enemy)
        return true;
    return false
}

let knightAttack = (row,col,board,enemy) => {
    let x = row + 2;
    if(x <= 7){
        if(checkKnight(x,col+1,col-1,board,enemy))
            return true;
    }
    x = row - 2;
    if(x >= 0){
        if(checkKnight(x,col+1,col-1,board,enemy))
            return true;
    }
    x = row + 1; 
    if(x <= 7){
        if(checkKnight(x,col+2,col-2,board,enemy))
            return true;
    }
    x = row - 1;
    if(x >= 0){
        if(checkKnight(x,col+2,col-2,board,enemy))
            return true;
    }
    return false    
}

let straightAttack = (row,col,board,team,attacker) => {
    let x;
    let y;

    //Up
    x = row - 1;
    while(x>=0){
        if(board[x][col].charAt(0) === team)
            break;
        else if (attacker.includes(board[x][col]))
            return true;
        x--;
    }
    //down
    x = row + 1;
    while(x <= 7){
        if(board[x][col].charAt(0) === team)
            break;
        else if (attacker.includes(board[x][col]))
            return true;
        x++;
    }
    //right
    y = col +1; 
    while(y <= 7) {
        if(board[row][y].charAt(0) === team)
            break;
        else if (attacker.includes(board[row][y]))
            return true;
        y++;
    }
    //left
    y = col -1;
    while(y >= 0) {
        if(board[row][y].charAt(0) === team)
            break;
        else if (attacker.includes(board[row][y]))
            return true;
        y--;
    }
    return false
}

let safeKing = (color,row,col,board) => {
    if((color == 'White') ? pawnAttack(true,row,col,board,'BP') : pawnAttack(false,row,col,board,'WP')){
        //under attack from enemy pawn
        return false;
    }if((color == 'White') ? diagonalAttack(row,col,board,'W',['BQ','BB','BK']) : diagonalAttack(row,col,board,'B',['WQ','WB','WK'])){
        //under attack from enemy quuen/bishop/king
        return false;
    }if((color) == 'White' ? knightAttack(row,col,board,'BN') : knightAttack(row,col,board,'WN')){
        //under attck from enemy knight
        return false;
    }if((color) == 'White' ? straightAttack(row,col,board,'W',['BR','BQ','BK']) : straightAttack(row,col,board,'B',['WR','WQ','WK'])){
        //under attack from rook/queen/king
        return false;
    }
    return true;
}

let moveKnight = (srow,scol,frow,fcol) => {
    if(Math.abs(srow - frow) == 2){
        if(Math.abs(scol - fcol) == 1){
            //valid
        }
    }
    if(Math.abs(scol - fcol) == 2){
        if(Math.abs(srow - frow) == 1){
            //valid
        }
    }

    //invalid
}

let moveBishop = (srow,scol,frow,fcol,board) => {
    let row_diff = frow - srow;
    let col_diff = fcol - scol;
    if(Math.abs(row_diff) !== Math.abs(col_diff)){
        //invalid
    }

    if(row_diff > 0 && col_diff > 0){   //move lower-right
        for(let x = 1; x< row_diff;x++){
            if(board[srow+x][scol+x] != '-'){
                //invalid
            }
        }
        //valid
    }
    if(row_diff > 0 && col_diff < 0){   //move lower-left
        for(let x = 1; x<row_diff;x++){
            if(board[srow+x][scol-x] != '-'){
                //invalid
            }
        }
        //valid
    }
    if(row_diff < 0 && col_diff > 0){   //move upper-right
        for(let x = 1; x<col_diff;x++){
            if(board[srow-x][scol+x] != '-'){
                //invalid
            }
        }
        //valid
    }
    if(row_diff < 0 && col_diff < 0){   //move upper-left
        row_diff = -row_diff;
        for(let x =1;x<row_diff;x++){
            if(board[srow-x][scol-x] != '-'){
                //invalid
            }
        }
        //valid
    }
}

let moveRook = (srow,scol,frow,fcol,board) => {
    //horizontal movement
    let trav;
    if(srow == frow){
        if(scol < fcol){
            //going right
            for(trav = scol + 1;trav<fcol;trav++){
                if(board[srow][trav] != '-'){
                    //wrong
                }
            }
            //if completed for loop means valid move
        }else{
            //going down
            for(trav = scol - 1; trav > fcol;trav--){
                if(board[srow][trav] != '-'){
                    //wrong
                }
            }
            //valid move
        }
    }//vertical movement
    if(scol == fcol){
        //going up
        if(frow < srow){
            for(trav = srow-1;trav>frow;trav--){
                if(board[trav][scol] != '-'){
                    //invalid move
                }
            }
            //valid move
        }else{
            //going down
            for(trav =srow+1; trav<frow;trav++){
                if(board[trav][scol] != '-'){
                    //invalid move
                }
            }
            //valid move
        }
    }
    //invalid
}

let movePawn = (color,srow,scol,frow,fcol,board) => {
    let dist = Math.abs(frow - srow);
    if(color === 'White'){
        if(dist == 2 && scol == 6 && scol == fcol && board[frow+1][fcol] == '-' && board[frow][fcol] == '-'){
            // valid move and pawn can get attacked by en passant
            
        }
        if(dist == 1 && fcol == scol && board[frow][fcol].charAt(0) == '-'){
            //valid move
        }
        if(dist == 1 && Math.abs(fcol - scol) == 1 && board[frow][fcol].charAt(0) == 'B'){
            //valid move  attack
        }
        if(dist == 1 && (fcol - scol) == 1 && board[srow][fcol] == enpass){
            //en passant attack
        }
    }else {
        if(dist == 2 && scol == 2 && scol == fcol && board[frow-1][fcol] == '-' && board[frow][fcol] == '-'){
            // valid move
        }
        if(dist == 1 && fcol == scol && board[frow][fcol].charAt(0) == '-'){
            //valid move
        }

        if(dist == 1 && Math.abs(fcol - scol) == 1 && board[frow][fcol].charAt(0) == 'W'){
            //valid attack
        }
        if(dist == 1 && Math.abs(fcol - scol) == 1 && board[srow][fcol] == enpass){
            //valid enpassannt
        }
    }
}

let moveQueen = (srow,scol,frow,fcol,board) =>{
    let row_diff = frow - srow;
    let col_diff = fcol - scol;

    if(Math.abs(row_diff) == Math.abs(col_diff)){
        //diagonal
        moveBishop(srow,scol,frow,fcol,board);
    }else{
        moveRook(srow,scol,frow,fcol,board);
    }

    //return false
}

let moveKing = (srow,scol,frow,fcol,board) => {
    let row_diff = Math.abs(frow - srow);
    let col_diff = Math.abs(fcol - scol);

    if (row_diff + col_diff == 2){
        moveBishop(srow,scol,frow,fcol,board);
    }

    if(row_diff + col_diff == 1){
        moveRook(srow,scol,frow,fcol,board);
    }
}

let validate = (start, final, color, board, moved) => {
    start_pos = getCoordinates(start);
    final_pos = getCoordinates(final)
    king_pos = getCoordinates(moved[color]);
    
    //valid cell inputs
    if(color.charAt(0) == board[start_pos.row][start_pos.col].charAt(0) &&  color.charAt(0) != board[final_pos.row][final_pos.col].charAt(0)){
        if(safeKing(color,king_pos.row,king_pos.col,board)){
            //If valid move
        }else{
            //piece to move is king
        }
        
    }else{
        console.log('Incorrect cell entry');
    }
}

let getCoordinates = (pos) => {
    let col = pos.charAt(0);
    let row = pos.charAt(1);
    row = 8 - parseInt(row);
    col = (col.charCodeAt(0) - 97);
    return {row,col}
}

module.exports.validate = validate;