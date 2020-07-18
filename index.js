const path = require('path');
const express = require('express');
const http = require('http')
const socketio = require('socket.io')
const addUser = require('./src/utils/user')


const app = express()
const server = http.createServer(app)
const io = socketio(server);

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname,'./public')
//console.log(publicDirectoryPath)
app.use(express.static(publicDirectoryPath))

io.on('connection',(socket)=>{
    socket.on('join',({username,room},callback)=>{
        const {error,user} = addUser({id:socket.id,username,room})
        if(error){
            return callback(error)
        }
        console.log(user.username + ' has joined');
    })
    
    
})



server.listen(port,()=>{
    console.log('Server running on port',port);
})
