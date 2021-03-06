const path = require('path');
const express = require('express');
const http = require('http')
const socketio = require('socket.io')
const { addUser, getRoom } = require('./src/utils/user')
const rsp = require('./src/utils/gameLogic')


const app = express()
const server = http.createServer(app)
const io = socketio(server);

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, './public')


app.use(express.static(publicDirectoryPath)) //serving static files
var storeId = [] //storing id of each emitting socket
var storeName = [] //players who have Joined
var count = 0

io.on('connection', (socket) => {
    socket.on('join', ({ username, room }, callback) => { //request from client
        const { error, user } = addUser({ id: socket.id, username, room })

        if (error) {
            return callback(error)
        }
        storeId.push(user.id)
        storeName.push(user.username)
        console.log(user.username + ' has joined');
        console.log(storeId.length)
        socket.emit('initial') //restricting initially
        socket.broadcast.emit('newUser')
        if (storeId.length == 4) {
            //game will be started only when four players join
            socket.emit('canStart')
            socket.broadcast.emit('allHaveJoined')
        }
        else {
            socket.emit('untilEveryoneJoin')
        }

    })


    socket.on('play', () => {
        //When all four players join game will be started
        //since no input mechanism is required, client socket events are not added in the code
        nextItr()
        function nextItr() {
            count += 1
            var { arr } = rsp()
            if (count > 50) {
                console.log('GAME IS OVER')
                console.log('Final Score board is')
                console.table(arr.score)

                //printing score of each player vs player
                for(var i=0; i<4; i++){
                    for(var j=0; j<4; j++){
                        if(i!=j){
                            console.log('Score of '+storeName[i]+ ' vs ' +storeName[j]+ ' is ',arr.score[i][j])
                        }
                        
                    }
                }
                io.emit('gameOver')
                return
            }
            else {
                console.log('Score board for round ' + arr.round + ' is ')
                console.table(arr.score)
                j = 0
                nextItr()
            }
        }
    })
})

server.listen(port, () => {
    console.log('Server running on port', port);
})

//If user mechanism is considered then following socket events will occur

/*socket.on('played', () => {
    console.log(storeName[j] + ' played ')
    console.log(j)

    if (k < 4) {
        console.log(j)

        valuePerItr[j] = Math.floor(Math.random() * 3) + 7; //randomly generate 7,8,9 i.e stone,scissor and paper
        console.log(valuePerItr)
        j++
        console.log(j)
        if (j == 4) {
            console.log(j)
            var { score, final } = rsp(valuePerItr)
            if (final) {
                console.log('Game is over and scoreboard is ')
                console.log(final)
                //io.emit('gameOver')
            }
            else {

                console.log(score)
                console.log('Next round')
                console.log(j)
                j = 0
                console.log(j)
                valuePerItr = []
                console.log(valuePerItr)
                socket.to(storeId[j]).emit('nextRound')
                // io.to(getRoom).emit('waiting')
                // socket.to(storeId[j]).emit('turn',storeName[j])
            }
        }

        io.emit('waiting', storeName[j])
        socket.to(storeId[j]).emit('turn', storeName[j])
    }
})*/









