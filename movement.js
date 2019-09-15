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

let moveKnight = (srow,scol,frow,fcol) => {
    if(Math.abs(srow - frow) == 2){
        if(Math.abs(scol - fcol) == 1){
            //valid
            return true;
        }
    }
    if(Math.abs(scol - fcol) == 2){
        if(Math.abs(srow - frow) == 1){
            //valid
            return true;
        }
    }
    //invalid
    return false;
}

let moveBishop = (srow,scol,frow,fcol,board) => {
    let row_diff = frow - srow;
    let col_diff = fcol - scol;
    if(Math.abs(row_diff) !== Math.abs(col_diff)){
        //invalid
        return false;
    }

    if(row_diff > 0 && col_diff > 0){   //move lower-right
        for(let x = 1; x< row_diff;x++){
            if(board[srow+x][scol+x] != '-'){
                //invalid
                return false;
            }
        }
        //valid
        return true;
    }
    if(row_diff > 0 && col_diff < 0){   //move lower-left
        for(let x = 1; x<row_diff;x++){
            if(board[srow+x][scol-x] != '-'){
                //invalid
                return false;
            }
        }
        //valid
        return true;

    }
    if(row_diff < 0 && col_diff > 0){   //move upper-right
        for(let x = 1; x<col_diff;x++){
            if(board[srow-x][scol+x] != '-'){
                //invalid
                return false;
            }
        }
        //valid
        return true;
    }
    if(row_diff < 0 && col_diff < 0){   //move upper-left
        row_diff = -row_diff;
        for(let x =1;x<row_diff;x++){
            if(board[srow-x][scol-x] != '-'){
                //invalid
                return false;
            }
        }
        //valid
        return true;
    }

    return false;
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
                    return false;
                }
            }
            //if completed for loop means valid move
            return true;
        }else{
            //going down
            for(trav = scol - 1; trav > fcol;trav--){
                if(board[srow][trav] != '-'){
                    //wrong
                    return false;
                }
            }
            //valid move
            return true;
        }
    }//vertical movement
    if(scol == fcol){
        //going up
        if(frow < srow){
            for(trav = srow-1;trav>frow;trav--){
                if(board[trav][scol] != '-'){
                    //invalid move
                    return false;
                }
            }
            //valid move
            return true;
        }else{
            //going down
            for(trav =srow+1; trav<frow;trav++){
                if(board[trav][scol] != '-'){
                    //invalid move
                    return false;
                }
            }
            //valid move
            return true;
        }
    }
    //invalid
    return false;
}

let moveQueen = (srow,scol,frow,fcol,board) =>{
    let row_diff = frow - srow;
    let col_diff = fcol - scol;

    if(Math.abs(row_diff) == Math.abs(col_diff)){
        //diagonal
        if(moveBishop(srow,scol,frow,fcol,board))
            return true;
    }else{
        if(moveRook(srow,scol,frow,fcol,board))
            return true;
    }
    //return false
    return false;
}

let moveKing = (srow,scol,frow,fcol,board) => {
    let row_diff = Math.abs(frow - srow);
    let col_diff = Math.abs(fcol - scol);

    if (row_diff + col_diff == 2){
        if(moveBishop(srow,scol,frow,fcol,board))
            return true;
    }

    if(row_diff + col_diff == 1){
        if(moveRook(srow,scol,frow,fcol,board))
            return true;
    }
    return false;
}