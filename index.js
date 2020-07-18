const path = require('path');
const express = require('express');
const http = require('http')
const socketio = require('socket.io')
const addUser = require('./src/utils/user')


const app = express()
const server = http.createServer(app)
const io = socketio(server);

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, './public')
//console.log(publicDirectoryPath)
app.use(express.static(publicDirectoryPath))
var storeId = []
var storeName = []
io.on('connection', (socket) => {
    socket.on('join', ({ username, room }, callback) => { //request from client
        const { error, user } = addUser({ id: socket.id, username, room })

        if (error) {
            return callback(error)
        }
        storeId.push(user.id)
        storeName.push(user.username)
        console.log(storeId)
        console.log(storeName)
        console.log(user.username + ' has joined'); //msg to be rendered in template
    })

    var valuePerItr = []
    var i = 0, j = 0;
    if (storeId.length == 4) { // when all the users will join
        if (j < 4) {
            io.to(storeId[j]).emit('turn')
            socket.broadcast.emit('waiting', storeName[j])
            socket.on('played', () => {
                valuePerItr[j] = Math.floor(Math.random() * 3) + 7;
            })
            j += 1
        }
    }
    else {
        socket.emit('untilEveryoneJoin')
    }


})



server.listen(port, () => {
    console.log('Server running on port', port);
})
