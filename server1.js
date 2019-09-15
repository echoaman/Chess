const net = require('net');
const chess = require('./chess');

let players = {};
let col;

let board;
let moved;

const server = net.createServer((client) => {

    client.on('data', (data) => {
        data = JSON.parse(data.toString());

        chess.validate(data.initial_pos,data.final_pos,data.color,data['board'],moved);

        if(data.color === 'White'){
            players.White.write(getData(data['board'],false));
            players.Black.write(getData(data['board'],true));
        }else{
            players.Black.write(getData(data['board'],false));
            players.White.write(getData(data['board'],true));
        }
    })

    client.on('error', () => {
        if(Object.keys(players).length == 2){
            //if 1 of the player disconnected, other is the winner
            Object.entries(players).forEach((pair) => {
                if(pair[1] !== client){
                    //Winner
                    pair[1].write(JSON.stringify({
                        winner: 'You WIN!'
                    }));
                    pair[1].end();

                    //restart server
                    server.listen(5000);
                }
                //clear the player list
                delete players[pair[0]];
            });
        }else{
            //if the only connected player left
            delete players[col];
        }
    });
});

server.listen(5000);
server.on('listening', () => {
    console.log(`Listening on port ${server.address().port}..`)
})

server.on('connection', (client) => {
    //1st player connected
    if(Object.keys(players).length === 0){

        //Randomly assign color
        col = Math.floor(Math.random() * 10) % 2;
        if (col == 0)
            players['White'] = client;
        else players['Black'] = client;
    }else{
        //2nd player connects
        //Assign the remaining color
        if(col == 0)
            players['Black'] = client;
        else players['White'] = client;
        
        //Close server for further connections
        server.close();
        console.log('start game!');

        board = startGame().board;
        moved = startGame().moved;
        Object.keys(players).forEach((k) => {
            if (k === 'White'){
                players[k].write(JSON.stringify({
                    startCol: k,
                    turn: true,
                    board: board
                }));
            }else 
                players[k].write(JSON.stringify({
                    startCol: k,
                    turn: false,
                    board: board
                }));
        });
    }
});

let getData = (board,turn) => {
    return JSON.stringify({
        board,
        turn
    });
}

let startGame = () => {
    return {
        board: [
            ['BR','BN','BB','BQ','BK','BB','BN','BR'],
            ['BP','BP','BP','BP','BP','BP','BP','BP'],
            ['-','-','-','-','-','-','-','-'],
            ['-','-','-','-','-','-','-','-'],
            ['-','-','-','-','-','-','-','-'],
            ['-','-','-','-','-','-','-','-'],
            ['WP','WP','WP','WP','WP','WP','WP','WP'],
            ['WR','WN','WB','WQ','WK','WB','WN','WR']
        ],
        moved:{
            a8: false,
            e8: false,
            h8: false,
            a1: false,
            e1: false,
            h1: false,
            Black: 'e8',
            White: 'e1'
        }
    };
} 