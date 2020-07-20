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
//console.log(publicDirectoryPath)
app.use(express.static(publicDirectoryPath))
var storeId = []
var storeName = []
var valuePerItr = []
var k = 0;
io.on('connection', (socket) => {
    socket.on('join', ({ username, room }, callback) => { //request from client
        const { error, user } = addUser({ id: socket.id, username, room })

        if (error) {
            return callback(error)
        }
        storeId.push(user.id)
        storeName.push(user.username)
        console.log(user.username + ' has joined'); //msg to be rendered in template
        // console.log(storeId.length)
        // console.log(storeId)
        socket.emit('initial') //restricting initially
        socket.broadcast.emit('newUser')
        if (storeId.length == 4) {
            socket.emit('canStart')
            socket.broadcast.emit('allHaveJoined')
        }
        else {
            socket.emit('untilEveryoneJoin')
        }

    })


    socket.on('play', () => {
        socket.broadcast.emit('waiting', storeName[j])
        socket.to(storeId[k]).emit('turn', storeName[j])
    })
    socket.on('played', () => {
        console.log(storeName[k] + ' played ')
        console.log(k)

        if (k < 4) {
            console.log(k)

            valuePerItr[k] = Math.floor(Math.random() * 3) + 7; //randomly generate 7,8,9 i.e stone
            console.log(valuePerItr)
            k++
            console.log(k)
            if (k == 4) {
                console.log(k)
                var { score, final } = rsp(valuePerItr)
                if (final) {
                    console.log('Game is over and scoreboard is ')
                    console.log(final)
                    //io.emit('gameOver')
                }
                else {

                    console.log(score)
                    console.log('Next round')
                    console.log(k)
                    k = 0
                    console.log(k)
                    valuePerItr = []
                    console.log(valuePerItr)
                    socket.to(storeId[k]).emit('nextRound')
                    // io.to(getRoom).emit('waiting')
                    // socket.to(storeId[j]).emit('turn',storeName[j])
                }
            }

            io.emit('waiting', storeName[k])
            socket.to(storeId[k]).emit('turn', storeName[j])
        }
    })

})

server.listen(port, () => {
    console.log('Server running on port', port);
})
