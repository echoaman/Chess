let getCoordinates = (pos) => {
    let col = pos.charAt(0);
    let row = pos.charAt(1);
    row = 8 - parseInt(row);
    col = (col.charCodeAt(0) - 97);
    return {row,col}
}

let validate = (start, final, color, board, moved) => {
    start_pos = getCoordinates(start);
    final_pos = getCoordinates(final)
    king_pos = getCoordinates(moved[color]);
    
    //valid cell inputs
    if(color.charAt(0) == board[start_pos.row][start_pos.col].charAt(0) &&  color.charAt(0) != board[final_pos.row][final_pos.col].charAt(0)){
        //move piece
        

        //check if king's safety
        
    }else{
        console.log('Incorrect cell entry');
    }
}

module.exports.validate = validate;