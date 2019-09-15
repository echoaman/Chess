const net = require('net');
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let options = {
    port : 5000
};

let col;

const client = net.createConnection(options, () => {
    client.on('data', (data) => {
        data = JSON.parse(data.toString());
        
        if(data.hasOwnProperty('startCol')){
            col = data.startCol;
            console.log(`You are the ${data.startCol.toUpperCase()} player!`);
            console.log('Enter the letter then number of cell.Example - c4');
        }

        if(data.hasOwnProperty('winner')){
            console.log(`\n${data.winner}`);
            rl.close();
        }

        if(data.hasOwnProperty('turn')){
            printBoard(data['board']);
            if(data['turn']){
                rl.resume();
                getCell(data['board']);
            }else console.log('The opponent is playing...');
        }
    });

});

client.on('connect', () => {
    rl.pause();
});

client.on('error', (e) => {
    console.log(e.message);
    rl.close();
});


let getCell = (board) => {
    rl.question('Cell of the piece to move: ', (initial_pos) => {
        initial_pos = initial_pos.trim().toLowerCase();
        if(checkInput(initial_pos)){
            rl.question('Move piece to cell: ',(final_pos) => {
                final_pos = final_pos.trim().toLowerCase();
                if(checkInput(final_pos)){
                    client.write(JSON.stringify({
                        initial_pos: initial_pos,
                        final_pos: final_pos,
                        color: col,
                        board: board
                    }));
                    rl.pause();
                }else getCell(board)
            })
        }else getCell(board);
    });
}

let checkInput = (cell) => {
    if(cell.length == 2){
        if(cell.charAt(0) >= 'a' && cell.charAt(0) <= 'h'){
            if(cell.charAt(1) >= '1' && cell.charAt(1) <= '8'){
                return true;
            }
        }
    }
    return false;
}

//remove later
let printBoard = (board) => {
    // process.stdout.write('\033c');
    console.log();
    process.stdout.write('  ');
    for(let x = 0; x<board.length; x++)
        process.stdout.write(` ${String.fromCharCode(97+x)}  `);
    console.log();

    for(let i = 0; i < board.length; i++){
        process.stdout.write('  ');
        for(let x = 0; x < board.length; x++)
            process.stdout.write('----');
        console.log();

        process.stdout.write(`${board.length-i} `);
        for(let j = 0; j < board.length; j++){
            if(board[i][j] === '-')
                process.stdout.write('|  |');
            else process.stdout.write(`|${board[i][j]}|`);
        }
        process.stdout.write(` ${board.length-i} `);
        console.log();
    }
    process.stdout.write('  ');
    for(let i = 0; i<board.length; i++)
        process.stdout.write('----');
    console.log();

    process.stdout.write('  ');
    for(let x = 0; x<board.length; x++)
        process.stdout.write(` ${String.fromCharCode(97+x)}  `);
    console.log('\n');
}
