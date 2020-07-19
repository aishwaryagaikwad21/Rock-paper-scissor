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
let j = 0;
io.on('connection', (socket) => {
    socket.on('join', ({ username, room }, callback) => { //request from client
        const { error, user } = addUser({ id: socket.id, username, room })

        if (error) {
            return callback(error)
        }
        storeId.push(user.id)
        storeName.push(user.username)
        console.log(user.username + ' has joined'); //msg to be rendered in template
        console.log(storeId.length)
        console.log(storeId)
        socket.emit('initial') //restricting initially
        if (storeId.length == 4) {
            console.log(storeName[0])
            console.log(storeName[1])
            console.log(storeName[2])
            console.log(storeName[3])
            socket.emit('canStart')
        }
        else {
            socket.emit('untilEveryoneJoin')
        }

    })


    socket.on('play', () => {
        io.to(getRoom).emit('waiting')
        socket.to(storeId[j]).emit('turn', storeName[j])
    })
    socket.on('played', () => {
        console.log(storeName[j] + ' played ')
        console.log(j)

        if (j < 4) {
            console.log(j)
            valuePerItr[j] = Math.floor(Math.random() * 3) + 7;
            console.log(valuePerItr)
            j++
            console.log(j)
            if (j > 3) {
                console.log(valuePerItr)
                console.log(j)
                const { score, final } = rsp(valuePerItr)
                if (final) {
                    console.log('Game is over and scoreboard is ')
                    console.log(final)
                }
                else {
                    
                    console.log(score)
                    j = 0
                    valuePerItr = []
                    io.to(getRoom).emit('waiting')
                    socket.to(storeId[j]).emit('turn')
                }
            }
            
            io.to(getRoom).emit('waiting')
            socket.to(storeId[j]).emit('turn')

        }






    })

    /*function eventHandle(j) {
        console.log(j)
        io.emit('waiting', storeName[j])
        socket.to(storeId[j]).emit('turn')
    }*/





})

server.listen(port, () => {
    console.log('Server running on port', port);
})
