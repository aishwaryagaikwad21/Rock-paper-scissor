const path = require('path');
const express = require('express');
const http = require('http')
const socketio = require('socket.io')
const addUser = require('./src/utils/user')
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
var i = 0, j = 0;
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


        if (storeId.length == 4) { // when all the users will join
            game(j)
            function game(j) {
                if (j < 4) {
                    console.log(storeId[0])
                    socket.to(storeId[0]).emit('turn', (storeId[0]))
                    socket.broadcast.emit('waiting', storeName[j])
                    socket.on('played', () => {
                        valuePerItr[j] = Math.floor(Math.random() * 3) + 7;
                        console.log(valuePerItr)
                        j+=1
                        game(j)
                    })
                }
                else{
                    const {score,round,final} = rsp(valuePerItr)
                    if(final){
                        console.log('Game is over and scoreboard is ')
                        console.log(final)
                    }
                    else{
                        console.log('Score of round' +round+ ' is ')
                        console.log(score)
                        j = 0
                        game(j)
                    }
                    
                }

            }
        }
        else {
            socket.emit('untilEveryoneJoin')
        }
    })





})



server.listen(port, () => {
    console.log('Server running on port', port);
})
